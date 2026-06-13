# Productify

A full-stack product sharing platform where users can showcase products, interact through comments, and manage their own listings.

## Live Demo

https://productify-1poe.onrender.com/

## Screenshots

### Home Page

<img width="935" height="868" alt="image" src="https://github.com/user-attachments/assets/f494982d-8f34-4703-bb14-26161eab7cff" />

Browse all products shared by creators.

### Product Details

<img width="944" height="752" alt="image" src="https://github.com/user-attachments/assets/14c1eb01-f321-4b01-b75b-e5e72b8af640" />

View detailed product information and interact through comments.

### Create Product

<img width="944" height="902" alt="image" src="https://github.com/user-attachments/assets/fbea2601-d916-496c-96cc-177e2c1f2331" />

Add new products with title, image URL, and description.

### User Dashboard

<img width="937" height="779" alt="image" src="https://github.com/user-attachments/assets/824990b5-9ce7-4011-9f0e-fbe851d697c4" />

Manage your own products from a dedicated dashboard.

### Comments System

<img width="938" height="781" alt="image" src="https://github.com/user-attachments/assets/4ab6a3c6-90c8-480f-88e6-122d0884fbce" />

Engage with creators through the built-in comment system.

## Features

### Authentication
- Secure user authentication using Clerk
- Protected routes
- User profile management

### Product Management
- Create products
- View product details
- Edit products
- Delete products
- Personal product dashboard

### Community Features
- Comment on products
- Delete own comments
- Creator information display

### UI Features
- Responsive design
- Dark theme
- Image preview support
- Loading states
- Toast notifications

## Tech Stack

### Frontend
- Angular
- TypeScript
- RxJS
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Drizzle ORM

### Authentication
- Clerk

### Deployment
- Render
- Neon PostgreSQL

## Project Structure

├── frontend
├── backend
├── database
└── shared

## API Endpoints

### Products

GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

### Comments

GET /api/comments/:productId

POST /api/comments

DELETE /api/comments/:id

### Users

POST /api/users/sync

GET /api/users/profile

## Installation

### Clone Repository

```bash
git clone https://github.com/RohitSavalagi/productify.git
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Future Improvements

- Search and filtering
- Product likes
- Product ratings
- Pagination
- Cloudinary image uploads
- Admin dashboard
- GitHub Actions CI/CD
- Docker support

## Author

Rohit Savalagi
