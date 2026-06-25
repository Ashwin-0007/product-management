# Product Management Dashboard

Full-stack take-home assignment for an admin product management dashboard.

This repository includes a React frontend and an Express/PostgreSQL backend API.

## Frontend Stack

- React 19
- Vite
- Tailwind CSS 4 with a responsive admin dashboard layout
- Fetch-based API client with JWT token persistence and refresh handling
- ESLint

## Backend Stack

- Node.js
- Express
- PostgreSQL hosted on Supabase
- Sequelize ORM for application queries
- Supabase SQL migrations and seed data
- JWT admin authentication
- Joi request validation

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Create a Supabase project, open the database connection settings, and paste your PostgreSQL connection string into `DATABASE_URL`.

Required backend environment variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-SUPABASE-HOST]:5432/postgres
DB_SSL=true
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=replace-with-another-long-random-secret
JWT_REFRESH_EXPIRES_IN=7d
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
CORS_ORIGIN=http://localhost:5173
```

Initialize Supabase CLI metadata once from the repository root if you have not already:

```bash
npx supabase init
```

Then link the local Supabase project to your hosted Supabase project from the backend folder:

```bash
npm run db:check
npm run db:link
```

Run database setup:

```bash
npm run db:migrate
npm run db:seed
```

Start the API:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:5000/api/v1
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend environment variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

The frontend runs at:

```text
http://localhost:5173
```

Build the frontend for production:

```bash
npm run build
```

## API Endpoints

Health:

```text
GET /api/v1/health
```

Auth:

```text
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Products:

```text
GET    /api/v1/products?search=keyboard
GET    /api/v1/products/:id
POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
```

All product routes require:

```text
Authorization: Bearer <token>
```

Example login body:

```json
{
  "email": "admin@example.com",
  "password": "ChangeMe123!"
}
```

Example login response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "accessToken": "short-lived-jwt",
    "refreshToken": "long-lived-jwt"
  }
}
```

Use `accessToken` in the `Authorization` header. Use `refreshToken` only with:

```json
{
  "refreshToken": "long-lived-jwt"
}
```

Example product body:

```json
{
  "name": "Wireless Mouse",
  "category": "Accessories",
  "price": 29.99,
  "stockStatus": "IN_STOCK"
}
```

Supported stock statuses:

```text
IN_STOCK
LOW_STOCK
OUT_OF_STOCK
```

## Backend Scripts

```bash
npm run dev
npm run start
npm run db:check
npm run db:link
npm run db:migrate
npm run db:seed
npm run db:reset
```

Database schema changes now live in:

```text
supabase/migrations
```

Seed data lives in:

```text
supabase/seed.sql
```

Supabase migrations are SQL files and do not use Sequelize's automatic undo flow. Add a new SQL migration for future schema changes and apply it with `npm run db:migrate`.
