# Product Management System (MERN)

A simple beginner-friendly MERN project with Admin and Staff roles.

## Features

- Admin and Staff login using JWT
- Password hashing using bcryptjs
- Admin can create Staff accounts
- Admin can add, view, update and delete products
- Staff can view and search products
- Search products by name
- Filter products by category
- Dashboard: product count, total stock and low-stock count
- Low stock means quantity below 5

## Project folders

- `backend`: Express, Mongoose, JWT and MongoDB APIs
- `frontend`: React pages and reusable components

## Requirements

Install Node.js. Create a MongoDB Atlas cluster and a database user.

## 1. Configure backend

Open a terminal in the `backend` folder:

```bash
npm install
```

Copy `.env.example` to `.env`. Put your MongoDB Atlas connection string in `MONGO_URI` and a private random value in `JWT_SECRET`.

Do not share `.env` or commit it to Git.

Example `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/product_management?retryWrites=true&w=majority
JWT_SECRET=use_a_long_private_random_value_here
```

If your database password contains special URL characters, URL-encode those characters before putting it in the URI.

## 2. Create the initial Admin

While inside `backend`:

```bash
npm run seed
```

Demo Admin login:

- Email: `admin@example.com`
- Password: `Admin@123`

This script creates the Admin only if that email does not already exist. Change the demo password before using the app outside local practice. There is no public registration.

## 3. Start backend

In the backend terminal:

```bash
npm run dev
```

Backend runs at `http://localhost:3000`.

## 4. Start frontend

Open a second terminal in the `frontend` folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## 5. Test the app

1. Sign in with the demo Admin account.
2. Add a few products.
3. Search and filter products.
4. Edit and delete a product.
5. Open Staff in the sidebar and create a Staff account.
6. Log out and sign in as Staff.
7. Confirm Staff can view products but cannot add, edit, delete or create accounts.

## API endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/create-user` | Admin |
| GET | `/api/products/dashboard` | Admin, Staff |
| GET | `/api/products` | Admin, Staff |
| GET | `/api/products/:id` | Admin, Staff |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |

Search example:

`GET /api/products?search=phone&category=Electronics`

## Simple architecture

React page -> Fetch API -> Express route -> JWT/role middleware -> Mongoose model -> MongoDB Atlas.

## Important learning notes

- JWT is signed, not encrypted. Do not put passwords in its payload.
- This project stores the JWT in browser localStorage for learning simplicity. A production app should consider stronger token storage and additional security controls.
- Logout clears the token from the browser. It does not revoke a copied token on the server; it expires after one hour.
- The backend checks permissions. Hiding buttons in React is only for user experience and is not the security control.
