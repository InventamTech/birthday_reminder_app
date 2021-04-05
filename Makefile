SERVICE = "birthday-test"

.PHONY: run

build:
	docker-compose build

run:
	@echo "Starting $(TITLE)"
	docker-compose up -d
	@echo "$(TITLE) running on $(ACCESS)"

runf:
	@echo "Starting $(TITLE)"
	docker-compose up

start:
	@echo "Starting $(TITLE)"
	docker-compose up --build

stop:
	@echo "Stopping $(TITLE)"
	docker-compose down

restart: stop print-newline run

print-newline:
	@echo ""
	@echo ""
