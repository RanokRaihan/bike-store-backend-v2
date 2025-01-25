# Blog App Backend

This is the backend for the Blog App. It provides APIs for managing blog posts, comments, and users.

## Live link

You can access the live application [here](https://blog-app-backend-ten-fawn.vercel.app/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

Clone the repository:

```bash
git clone https://github.com/RanokRaihan/blog-app-backend.git
```

Navigate to the project directory:

```bash
cd blog-app-backend
```

To install the dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### user endpoints

- `POST /api/auth/register` - create a user
- `POST /api/auth/login` - Login a user

### Blog Endpoint - only for authorized user

- `POST /api/blogs` - create a blog
- `GET /api/blogs` - PUBLIC endpoint to get all blog with search, sort , filter
- `PATCH /api/blogs/:id` - Update a blog by ID
- `DELETE /api/blogs/:id` - Delete a blog by ID

### admin enpoints

- `PATCH /api/admin/users/:userId/block` - admin block any user with user id
- `DELETE /api/admin/blogs/:id` - admi Delete any blog by ID
