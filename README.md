# Kanban Board

This project is not intended for commercial use. It is an opportunity for me to test and showcase my knowledge of Vue 3 and Nuxt.

The project is based on the [Kanban Task Management Web App](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) over on [Frontend Mentor](www.frontendmentor.io) - please check them out if you're looking for a project to test yourself with. All design and assets files are provided by [FrontEnd Mentor](www.frontendmentor.io).

## Software Architecture

This project is built with:

- 🧱 Framework: Vue 3 
- 🏗️ Meta-framework: Nuxt 3 
- 📦 Package management: PNPM
- 📚 UI Library: PrimeVue
- 🧪 Unit Testing: Vitest (Code Coverage with V8)
- 🚰 CI Pipeline: Github Actions
- 📀 Database: SQLite3

Some might consider Nuxt to be overkill for a project of this size but I feel that the pre-defined project strucuture, file based routing, robust plugins system and SSR all make it worthwhile to use for the majority of Vue 3 projects. I don't know why I feel the need to justify this on a personal project but here we are.

### API

The API is ran on Nuxt's in-built [Nitro](https://nitro.build/) server. This uses file-based routing in a similar fashion to Nuxt.

The API itself is RESTful, with resources being accessed based on their respective names and ID's along with a HTTPS verb (GET, POST, etc).

Each file represents a single endpoint e.g. `columns.get.ts` will only handle GET requests for /columns. This improves maintainability and testability by minimising the responsibilities of each event handler.

### Database

To keep everything easily encapsulated in the one project I have chosen to use SQLite3 as the dataabase. It's easy to run and has minimal overhead - it's just a single file.

The database is stored at `server/db/kanban.db` and an initialisation script can be found at `server/db/initialise.sql`, `initialise.sql` should give you a good understanding of the database structure and how to interact with it.

#### Accessing the Database

A plugin (`server/plugins/db.ts`) has been created to handle database connections, it exposes the database via the event context. You can access it by using `event.context.$db` in any server event handler.

## Running the Project

> A live version of this project will be deployed once it's complete, I will post the URL here when it's available (or I'll forget...)

To run the project:

1. Clone the repository from GitHub

```bash
https://github.com/rstainsby/kanban-board.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the project

```bash
pnpm run dev
```