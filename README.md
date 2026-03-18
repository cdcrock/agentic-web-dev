# Agentic Web Dev

Full-stack web application skeleton — Spring Boot (JDK 21) backend + Angular 21 frontend.

## Project Structure

```
agentic-web-dev/
├── backend/                  # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/app/
│   │   │   │   ├── AppApplication.java   # Entry point
│   │   │   │   ├── controller/           # REST controllers
│   │   │   │   ├── service/              # Business logic
│   │   │   │   ├── repository/           # Data access
│   │   │   │   ├── model/                # Entities / DTOs
│   │   │   │   └── config/               # Spring configuration
│   │   │   └── resources/
│   │   │       └── application.yml       # App configuration
│   │   └── test/
│   └── pom.xml
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts                    # Root component
│   │   │   ├── app.config.ts             # Angular application config
│   │   │   ├── app.routes.ts             # Route definitions
│   │   │   ├── health.service.ts         # Backend health API client
│   │   │   └── ...
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── proxy.conf.json                   # Dev proxy → backend
│   ├── angular.json
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

| Tool | Version |
|------|---------|
| JDK  | 21      |
| Maven | 3.9+  |
| Node.js | 20+ |
| npm  | 10+     |
| Angular CLI | 21+ |

### Install Angular CLI

```bash
npm install -g @angular/cli@21
```

## Running the Applications

### Backend

```bash
cd backend
# Run in development mode
mvn spring-boot:run

# Or build and run the jar
mvn package -DskipTests
java -jar target/app-0.0.1-SNAPSHOT.jar
```

The backend starts on **http://localhost:8080**.

Health check endpoint: `GET http://localhost:8080/api/health`

### Frontend

```bash
cd frontend
npm install
ng serve
```

The frontend starts on **http://localhost:4200** and proxies `/api/**` requests to the backend automatically via `proxy.conf.json`.

## Building for Production

### Backend

```bash
cd backend
mvn package -DskipTests
```

Output: `backend/target/app-0.0.1-SNAPSHOT.jar`

### Frontend

```bash
cd frontend
npm install
ng build
```

Output: `frontend/dist/frontend/`

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Returns `{"status":"UP"}` |

## Architecture Notes

- **No Spring Security** — add it when authentication is needed.
- **No database** — add Spring Data JPA + a database driver when persistence is needed.
- CORS is pre-configured to allow `http://localhost:4200` during development.
- Angular uses the standalone component pattern (no NgModules).
