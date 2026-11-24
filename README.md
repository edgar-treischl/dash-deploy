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
│   └── nginx.conf
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

### Access applications

| Application | URL |
|---|---|
| Confederation Shell | http://localhost:8080/ |
| Class MFE | http://localhost:8080/class/ |

The class build currently uses `/klassenwiederholung-mfe/` as its asset base;
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
- [ ] Introduce appropriate access control

## Architectural Principles

- **Independent applications:** Shell and MFEs have separate build and deployment lifecycles.
- **Centralized hosting:** Applications are served through a common Nginx instance.
- **Infrastructure as code:** Hosting configuration is version-controlled in this repository.
- **Environment independence:** Runtime configuration will allow applications to be deployed across different environments without rebuilding the Shell.
- **Simplicity first:** Start with Docker Compose and static hosting; introduce additional infrastructure only when needed.