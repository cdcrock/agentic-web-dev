#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
BACKEND_DIR="$SCRIPT_DIR/backend"
TAB_PREFIX="dev-script"

escape_for_applescript() {
  local input=$1
  # Escape backslashes and double quotes for safe inclusion in an AppleScript string literal
  input=${input//\\/\\\\}
  input=${input//\"/\\\"}
  # Optionally normalize newlines to \n sequences
  input=${input//$'\n'/\\n}
  printf '%s' "$input"
}

open_service_tab() {
  local cmd="$1"
  local win_title="${TAB_PREFIX}-$2"
  local escaped_cmd
  local escaped_win_title
  escaped_cmd=$(escape_for_applescript "$cmd")
  escaped_win_title=$(escape_for_applescript "$win_title")
  osascript <<EOF
tell application "Terminal"
  activate
  set newTab to do script "$escaped_cmd"
  set custom title of newTab to "$escaped_win_title"
end tell
EOF
}

launch_frontend() {
  echo "Launching frontend..."
  if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo "Frontend dependencies not found (missing node_modules)."
    echo "Installing npm dependencies in '$FRONTEND_DIR'..."
    if ! (cd "$FRONTEND_DIR" && npm install); then
      echo "Error: npm install failed. Please fix the issues above and re-run the dev script."
      return 1
    fi
  fi
  open_service_tab "cd '$FRONTEND_DIR' && ng serve" "frontend"
}

launch_backend() {
  echo "Launching backend..."
  open_service_tab "cd '$BACKEND_DIR' && mvn spring-boot:run" "backend"
}

shutdown_all() {
  echo "Shutting down all service tabs..."
  osascript <<EOF
tell application "Terminal"
  set menuWindow to front window
  set winList to {}
  repeat with w in (every window)
    if w is not menuWindow then
      repeat with t in (every tab of w)
        set tabTitle to (custom title of t)
        if tabTitle is not missing value and tabTitle starts with "$TAB_PREFIX" then
          set end of winList to w
          exit repeat
        end if
      end repeat
    end if
  end repeat
  repeat with w in winList
    try
      close w
    end try
  end repeat
end tell
EOF
  echo "Done."
}

show_menu() {
  echo ""
  echo "============================="
  echo "  Dev Launch Menu"
  echo "============================="
  echo "  1) Launch frontend"
  echo "  2) Launch backend"
  echo "  3) Launch both"
  echo "  4) Shut down all"
  echo "  q) Quit"
  echo "============================="
  printf "Select option: "
}

# If running inside VS Code's integrated terminal, re-launch this script in Terminal.app
if [[ "$TERM_PROGRAM" == "vscode" ]]; then
  escaped_script=$(escape_for_applescript "$SCRIPT_DIR/dev.sh")
  osascript <<APPLESCRIPT
tell application "Terminal"
  activate
  do script "bash '$escaped_script'"
end tell
APPLESCRIPT
  exit 0
fi

echo "Starting development environment..."
launch_frontend
launch_backend
echo "Services launched in new terminal tabs."

while true; do
  show_menu
  read -r choice
  case "$choice" in
    1) launch_frontend ;;
    2) launch_backend ;;
    3) launch_frontend; launch_backend ;;
    4) shutdown_all ;;
    q|Q) echo "Exiting."; exit 0 ;;
    *) echo "Invalid option. Choose 1-4 or q." ;;
  esac
done
