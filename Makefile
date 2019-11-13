
startDb: stopDb
	(cd ./dev/database && docker-compose run --rm --name postgres_dictionary -p 5432:5432 db)

stopDb:
	docker stop postgres_dictionary || true

.PHONY: startDb stopDb
