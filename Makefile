.PHONY: up down

up:
	docker compose up -d
	@printf '\nShell: http://localhost:8080/\nClass MFE: http://localhost:8080/class/\n'

down:
	docker compose down
