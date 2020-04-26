
startDb: stopDb
	(cd ./dev/database && docker-compose run --rm --name postgres_dictionary -p 5432:5432 db)

stopDb:
	docker stop postgres_dictionary || true

createSchema:
	(cd ./dev/database && node createSchema.js)

seedDatabase:
	(cd ./dev/database && node seedDatabase.js)

.PHONY: startDb stopDb
