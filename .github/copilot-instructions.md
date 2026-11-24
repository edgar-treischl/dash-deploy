# Copilot Instructions for Dash Confederation Deployment

## Project Overview

This repository manages deployment infrastructure for the Confederation Shell and Micro Frontend (MFE) applications using Docker Compose and Nginx.

**Key Architecture:**
- **Confederation Shell**: Core frontend application serving as the host for Module Federation
- **MFEs (Micro Frontend Applications)**: Independently built frontend applications (e.g., Dashboard, Reporting, Administration) loaded by the Shell through Module Federation
- **Hosting Strategy**: Static hosting via Nginx running in Docker, with volume mounts pointing to versioned `deployments/*/current/` directories

Each frontend application is built independently in its own repository (using Vite or similar), producing a `dist/` directory. These build artifacts are deployed by copying them into the corresponding `deployments/[app-name]/current/` directory in this repository.

## Running the Environment

### Docker Compose Operations

```bash
# Start the Nginx container with current deployments
docker compose up -d

# Stop the environment
docker compose down

# View logs
docker compose logs -f nginx

# Rebuild and restart (if nginx image changes)
docker compose up --build -d
```

### Accessing Applications

| Application | URL |
|---|---|
| Confederation Shell | http://localhost:8080/ |
| Dashboard MFE | http://localhost:8080/mfe-dashboard/ |

## Repository Structure & Deployment

```
deployments/
├── shell/current/              # Shell build artifacts (copied from shell repo dist/)
├── class/current/              # (Future) Class MFE artifacts
└── [other-mfes]/current/       # Additional MFE deployments follow the same pattern

environments/
├── dev/config.json             # Development environment configuration
└── prod/config.json            # Production environment configuration

nginx/
└── nginx.conf                   # Nginx configuration for routing and SPA fallback
```

**Deployment Pattern:**
- Each application's `dist/` directory is copied to its corresponding `deployments/[app-name]/current/` directory
- Nginx serves these directories as static content under application-specific paths
- The `SPA fallback` is configured to route all non-static requests to `index.html` for each application

### Adding a New MFE

1. Add a service volume in `docker-compose.yml`:
   ```yaml
   - ./deployments/mfe-name/current:/usr/share/nginx/html/mfe-name:ro
   ```

2. Add a location block in `nginx/nginx.conf`:
   ```nginx
   location /mfe-name/ {
       try_files $uri $uri/ /mfe-name/index.html;
   }
   ```

3. Create the deployment directory structure:
   ```bash
   mkdir -p deployments/mfe-name/current
   ```

4. Copy the MFE's `dist/` contents into `deployments/mfe-name/current/`

## Configuration

**Environment-specific configuration** is stored in `environments/[env]/config.json`. These files are currently empty placeholders but will support runtime configuration for different deployment environments (Phase 3 of the roadmap).

**Nginx Configuration (`nginx/nginx.conf`):**
- Root serves the Shell at `/`
- Each MFE is served under its own path (`/mfe-name/`)
- SPA fallback ensures router-based navigation works (redirects to `index.html`)
- Static assets (`js`, `css`, `json`, `png`, `jpg`, `svg`, `woff2`) return 404 if not found (no fallback)

## Key Conventions

- **Volume mounts are read-only** (`:ro` flag) to prevent containers from modifying deployment artifacts
- **Deployment directories use a `current/` subdirectory** to allow for future versioning and rollback strategies
- **Build artifacts are not versioned in this repository**; only configuration and infrastructure code is version-controlled
- **The `.gitignore` excludes `deployments/**/current/*`** to prevent build artifacts from being committed (except for `.gitkeep` files that maintain directory structure)

## Roadmap Phases

This repository follows a phased approach to deployment maturity:

- **Phase 1 (Current):** Local hosting with Docker Compose and static Nginx serving
- **Phase 2:** Deployment automation (CI/CD pipelines for automatic artifact transfer)
- **Phase 3:** Runtime configuration (centralized `config.json` for environment-specific settings)
- **Phase 4:** Internal server hosting with DNS, HTTPS, and access control

## Architectural Principles

1. **Independent applications**: Shell and MFEs have separate build and deployment lifecycles
2. **Centralized hosting**: Applications are served through a common Nginx instance
3. **Infrastructure as code**: All hosting configuration is version-controlled
4. **Environment independence**: Runtime configuration will enable deployments across environments without rebuilding
5. **Simplicity first**: Start with Docker Compose; introduce additional infrastructure only when needed
