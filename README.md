# Dictionary Builder

This repository contains a web application that can be used as a word collection database and online dictionary. The entire application is written in JavaScript using NodeJS for the API server and React for the client app.

## Development

This application requires a running Postgres database. The easiest way to run a development database is using Docker and the project has been set up to assume that the Docker is available. Of course any Postgres instance could be used as long as the required configuration changes are made.

### Quick start

```sh
# Install dependencies
npm install

# Start Postgres database using Docker
npm run db

# Start NodeJS API server
npm start

# Start Webpack development server (to serve front-end application)
npm run dev
```

## Data Model

Each *headword* is unique and forms the root of the data structure. A *citation* is a piece of text extracted from a *source* such as a book, website, etc. Citations are collected for the various headwords and each citation relates to one of the *meanings* of a particular headword.

A single dictionary *entry* can be created for each headword. The entry can include some or all of the meanings associated with that headword and some or all of the citations associated with each meaning. *References* can also be created and can then be used in one or more entries.

![Data Model](https://raw.githubusercontent.com/jeremyhewett/dictionary-builder/master/docs/dataModel.png)

## Architecture

The application uses a 3-tiered architecture

1. Postgres database
2. NodeJS server providing a REST API
3. A React client application

### Database

The database schema can be found in `./server/database/schema.sql`. This file is used to create the schema when running `npm run schema`.

The Database class in `./server/database/Database.js` provides an interface to the database and uses Knex to construct SQL query strings. A JavaScript class for each database entity is located in `./server/database/types/` and the Database class uses these types to interact with the database tables, like a very basic ORM. Examples of how it's used can be found in the other modules, e.g. `./server/citations/Citations.js`.

### NodeJS Server

The NodeJS server uses the Express framework to provide a REST API for interacting with the data in the database. The entry point for the server is `./server/index.js` which, when run, starts a web server on the configured port. The API paths are set up in `./server/app.js` along with some middleware modules. Each domain area is mounted as a sub-module using its own Express Router. For example, the entries module `./server/entries/Entries.js` creates an Express router that is mounted at the path `/api/entries/`. The entries module implements all the code that needs to run when a request comes in for a path under `api/entries/`.

The server provides an authentication middleware `./server/auth/Auth.js` that verifies the user for each request. The auth middleware uses JWT tokens and can accept a token as a cookie or a request header although, as of now, only cookies are implemented. It also provides CSRF protection by verifying an `x-csrf-token` header.

Dictionary entries that have been made public can be viewed by anyone without the need to log in. But any actions that modify data need to be restricted to authorized users. Authorization is achieved using a simple strategy based on roles. There are three roles

1. reviewer
2. editor
3. admin

Users can be assigned one or more roles, and any action can be limited to one or more roles.

### React App

A React app provides the user interface, sending requests from the browser to the API in response to user actions. The app was created using `create-react-app` and the original scripts that that tool provide are still used. The entry point for the React app is in `./client/index.js`.  The app is URL-driven and the route to each view is configured in `./client/Routes.jsx`.

Some key files of interest:

- Left side menu
  `./src/layouts/Dashboard/components/Sidebar/index.jsx`
- Top bar
  `./src/layouts/Dashboard/components/Topbar/index.jsx`
- Login page
  `./src/views/SignIn/index.jsx`
- Dictionary Entry page
  `./src/views/Entry/index.jsx`

## Deployment

The NodeJS server can be deployed as is since it is written in standard JavaScript. The front-end, however, needs to be compiled since it uses JSX and a few other non-native technologies. Webpack is used to serve the front-end during development but in order to deploy the application, the front-end first needs to be built so that it can be served by the NodeJS server. Running `npm run build` will create a `build` folder and as can be seen in `./server/app.js`, the server is configured to serve static content from `./build`.