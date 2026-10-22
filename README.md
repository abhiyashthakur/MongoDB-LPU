# MongoDB Backend

A minimal Node.js backend using Express and Mongoose.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Start MongoDB locally, then run the app:

   ```bash
   npm run dev
   ```

## Available routes

- `GET /health` - basic service health check
- `POST /api/savedata` - save a user.
- `POST /api/products` - create a product
- `GET /api/products` - list all products
- `GET /api/products/:id` - get one product
- `PUT /api/products/:id` - update a product
- `DELETE /api/products/:id` - delete a product
- `GET /api/products/category/:category` - find products by category

Product request body:

```json
{
   "name": "Keyboard",
   "category": "Electronics",
   "price": 49.99,
   "quantity": 10,
   "brand": "KeyPro",
   "inStock": true
}
```

Example request body:

```json
{
   "userName": "Piyush",
   "age": 24,
   "password": "123456",
   "email": "piyush@gmail.com",
   "gender": "Female",
   "address": "LPU"
}
```
