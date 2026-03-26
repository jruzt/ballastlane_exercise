# Library Management System

Library management system built for a Ruby on Rails technical interview exercise.

## User Story

As a librarian, I need to manage the catalog and track borrowed books so I can keep the library organized and know which members have overdue items.

As a member, I need to search books and borrow available copies so I can manage my reading and due dates easily.

## Stack

- Ruby 3.2.2
- Rails 7.2
- PostgreSQL
- RSpec
- React 19
- Vite 6

## Features

- Member registration, login, and logout
- Librarian and member roles
- Librarian-only book CRUD
- Book search by title, author, or genre
- Borrowing with availability and duplicate-borrow protection
- Return flow for librarians
- Librarian dashboard with totals, due-today books, and overdue members
- Member dashboard with active and overdue borrowings

## Running The App

You can run the project either:

- locally, with Rails and Vite started separately
- with Docker Compose, if you prefer an isolated environment

### Option 1: Run Locally

#### Backend

1. Install Ruby gems:

```bash
bundle install
```

2. Create and prepare the database:

```bash
bin/rails db:create db:migrate db:seed
```

3. Start Rails:

```bash
bin/rails server
```

The Rails API runs at `http://localhost:3000`.

#### Frontend

The React app lives in [frontend](/frontend).

Use Node `20.18.1` or newer. The checked-in version is in [frontend/.nvmrc](/frontend/.nvmrc).

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start Vite:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API requests to Rails.

### Option 2: Run With Docker

```bash
docker compose up --build
```

This starts three services:

- Rails API at `http://localhost:3000`
- React + Vite at `http://localhost:5173`
- PostgreSQL at `localhost:5432`

On the first boot, Rails prepares the database automatically inside the `web` container.
The Vite proxy targets the Rails container through `VITE_API_PROXY_TARGET=http://web:3000`.

To stop the stack:

```bash
docker compose down
```

To reset the database volume too:

```bash
docker compose down -v
```

Useful Docker commands:

```bash
docker compose exec web bin/rails db:seed
docker compose exec web bin/rails db:reset
docker compose exec web bin/rails console
```

## Demo Credentials

- Librarian: `librarian@example.com / password123`
- Member: `member@example.com / password123`
- Overdue member: `overdue@example.com / password123`

## API Summary

- `POST /api/v1/auth/sign_up`
- `POST /api/v1/auth/sign_in`
- `DELETE /api/v1/auth/sign_out`
- `GET /api/v1/me`
- `GET /api/v1/dashboard`
- `GET /api/v1/books`
- `POST /api/v1/books`
- `PATCH /api/v1/books/:id`
- `DELETE /api/v1/books/:id`
- `GET /api/v1/borrowings`
- `POST /api/v1/borrowings`
- `PATCH /api/v1/borrowings/:id/return`

## Test Suite

Run the backend test suite with:

```bash
bundle exec rspec
```

Run the frontend production build with:

```bash
cd frontend
npm run build
```

## Project Notes

- Public registration creates members only. Librarians are seeded for demo purposes.
- Borrowing uses a database-backed uniqueness rule so a member cannot hold the same book twice at once.
- Borrowing also uses a row lock on the book record to avoid oversubscribing the last available copy.

Additional notes are available in [docs/architecture.md](/docs/architecture.md) and [docs/genai-notes.md](/docs/genai-notes.md).
