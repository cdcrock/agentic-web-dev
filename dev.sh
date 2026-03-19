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
  local tab_title="${TAB_PREFIX}-$2"
  local escaped_cmd
  local escaped_tab_title
  escaped_cmd=$(escape_for_applescript "$cmd")
  escaped_tab_title=$(escape_for_applescript "$tab_title")
  osascript <<EOF
tell application "Terminal"
  activate
  set newTab to do script "$escaped_cmd" in window 1
  set custom title of newTab to "$escaped_tab_title"
end tell
EOF
}

launch_frontend() {
  echo "Launching frontend..."
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
  set tabList to {}
  repeat with w in (every window)
    repeat with t in (every tab of w)
      set tabTitle to (custom title of t)
      if tabTitle is not missing value and tabTitle starts with "$TAB_PREFIX" then
        set end of tabList to t
      end if
    end repeat
  end repeat
  repeat with t in reverse of tabList
    try
      close t
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
