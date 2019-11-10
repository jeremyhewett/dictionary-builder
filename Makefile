
startDb: stopDb
	(cd ./dev/database && docker-compose run --rm --name postgres_assets -p 5432:5432 db)

stopDb:
	docker stop postgres_assets || true

.PHONY: startDb stopDb
