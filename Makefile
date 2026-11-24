.PHONY: help up down build build-local logs clean

help:
	@echo "Confederation Deployment Commands:"
	@echo "  make up          - Start Docker Compose environment"
	@echo "  make down        - Stop Docker Compose environment"
	@echo "  make build       - Build Docker image locally (ghcr.io/edgar-treischl/dash-deploy:latest)"
	@echo "  make build-local - Build and run locally with Docker Compose"
	@echo "  make logs        - View Docker Compose logs"
	@echo "  make clean       - Remove Docker image and containers"

up:
	docker compose up -d
	@printf '\n✓ Confederation started\n'
	@printf '  Shell:     http://localhost:8080/\n'
	@printf '  Class MFE: http://localhost:8080/class/\n'

down:
	docker compose down
	@echo "✓ Confederation stopped"

build:
	docker build -t ghcr.io/edgar-treischl/dash-deploy:latest .
	@echo "✓ Docker image built: ghcr.io/edgar-treischl/dash-deploy:latest"

build-local: build
	docker compose up -d
	@printf '\n✓ Confederation started\n'
	@printf '  Shell:     http://localhost:8080/\n'
	@printf '  Class MFE: http://localhost:8080/class/\n'

logs:
	docker compose logs -f nginx

clean:
	docker compose down
	docker image rm -f ghcr.io/edgar-treischl/dash-deploy:latest
	@echo "✓ Containers and images cleaned"
