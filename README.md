# Dash Confederation Deployment

This repository contains the deployment infrastructure for the Confederation Shell and its Micro Frontend (MFE) applications.

The goal is to provide a simple, centralized hosting environment for independently built frontend applications using **Docker, Docker Compose and Nginx**.

The frontend applications are maintained in separate repositories. Their Vite build artifacts (`dist/`) are deployed into this repository's designated application directories.

Nginx serves the Shell and MFEs under a common domain, allowing the Shell to load remote applications through Module Federation.

## Repository Structure

```
confederation-deployment/
├── docker-compose.yml
├── nginx/
│   ├── mfes.json
│   ├── nginx.conf.template
│   └── generate-config.js
├── deployments/
│   ├── shell/
│   │   └── current/
│   ├── class/
│   │   └── current/
│   ├── mfe-XXX/
│   │   └── current/
│   └── mfe-XXX/
│       └── current/
└── README.md
```


### Start/Stop the environment

Build the Shell and class MFE in their respective repositories and copy the
contents of their `dist/` directories into `deployments/shell/current/` and
`deployments/class/current/`. Start Docker Desktop, then run:

```bash
make up
make down
```

`make down` stops and removes the containers and Compose network; it leaves the
deployment artifacts and downloaded image intact.

### Production deployment

Use the standalone production Compose file to run the image published by CI:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --no-build
```

The server does not build the image or need local deployment artifacts.
The image contains the generated Nginx config and frontend artifacts.
After registry or artifact changes, wait for CI to publish the new image,
then run the commands above again. Authenticate with `docker login ghcr.io`
if the package is private.

Use `-f docker-compose.prod.yml` for production logs and shutdown too.
This stack uses its own Compose project and port 8080; stop the local stack
first if running production on the same host and port.

### Access applications

After changing the MFE registry or Nginx template, run
`docker compose up --build -d nginx` (or `make build-local`). Configuration is
generated during image build, not on container restart.
See [Adding an MFE](docs/ADDING_AN_MFE.md) for registration and deployment steps.

| Application | URL |
|---|---|
| Confederation Shell | http://localhost:8080/ |
| Class MFE (via Shell) | Loaded through Shell after login |

**MFE Access Control:** Direct access to MFE routes (e.g., `/class/`) is blocked
and redirects to the Shell login page. MFEs are only accessible through the Shell
after user authentication. This ensures that sensitive applications require login.

**Module Federation Note:** The class build currently uses `/klassenwiederholung-mfe/` as its asset base;
Nginx also serves the same files at that path. The current Shell build points
its class Module Federation remote at GitHub Pages, not this local deployment.
To test local federation, rebuild the Shell with its class remote URL set to
`http://localhost:8080/klassenwiederholung-mfe/assets/remoteEntry.js`.

## Deployment Concept

Each frontend application is built independently using Vite.

The resulting build artifacts (`dist/`) are copied into the corresponding deployment directory:

- Shell → `deployments/shell/current/`
- Class → `deployments/class/current/`

Nginx serves these directories as static applications. Updating frontend artifacts does not require rebuilding or restarting the Docker container.

**MFE Access Control:** All MFE routes are protected by authentication. Direct access is blocked and redirects to the Shell login page. See [docs/MFE_ACCESS_CONTROL.md](docs/MFE_ACCESS_CONTROL.md) for details on protecting existing MFEs and adding new ones.

## Roadmap

### Phase 1 – Local Hosting (Current)

- [x] Establish repository structure
- [x] Configure Docker Compose
- [x] Configure Nginx
- [x] Deploy Shell and one MFE locally
- [x] Verify Module Federation integration

### Phase 2 – Deployment Automation

- [ ] Introduce GitLab CI/CD pipelines
- [ ] Automate frontend builds and artifact transfers
- [ ] Enable independent deployment of Shell and MFEs
- [ ] Introduce deployment versioning and rollback

### Phase 3 – Runtime Configuration

- [ ] Introduce centralized runtime configuration (`config.json`)
- [ ] Configure dynamic Module Federation remote loading
- [ ] Support environment-specific remote URLs
- [ ] Separate application configuration from build artifacts

### Phase 4 – Internal Hosting

- [ ] Deploy to internal server
- [ ] Configure internal DNS
- [ ] Enable HTTPS
- [ ] Establish DEV and PROD environments
- [x] Introduce MFE access control (login required)

## Architectural Principles

- **Independent applications:** Shell and MFEs have separate build and deployment lifecycles.
- **Centralized hosting:** Applications are served through a common Nginx instance.
- **Infrastructure as code:** Hosting configuration is version-controlled in this repository.
- **Environment independence:** Runtime configuration will allow applications to be deployed across different environments without rebuilding the Shell.
- **Simplicity first:** Start with Docker Compose and static hosting; introduce additional infrastructure only when needed.