# E-Commerce Website

A simple and modern e-commerce website built with Next.js, Node.js backend, and CSS styling.

## Features

-  Product listing page with featured products
-  Product detail pages
-  Shopping cart functionality
- Add/remove items from cart
- Responsive design for mobile and desktop
-  Modern and clean UI

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes (Node.js)
- **Styling**: CSS3 with modern design patterns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── pages/
│   ├── api/
│   │   ├── products.js    # Products API endpoint
│   │   └── cart.js        # Cart API endpoint
│   ├── _app.js            # App wrapper with cart state
│   ├── index.js           # Home page
│   ├── cart.js            # Shopping cart page
│   └── product/
│       └── [id].js        # Product detail page
├── styles/
│   └── globals.css        # Global styles
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?id={id}` - Get a specific product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart` - Update cart item quantity
- `DELETE /api/cart` - Remove item from cart

## Features in Detail

### Home Page
- Displays all available products in a grid layout
- Quick "Add to Cart" button for each product
- Navigation to product details and cart

### Product Detail Page
- Full product information
- Quantity selector
- Add to cart functionality
- Stock availability display

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Calculate total price
- Checkout button (UI ready)

## Development

To build for production:
```bash
npm run build
npm start
```

## Notes

- Cart data is stored in-memory (resets on server restart)
- For production, consider using a database for persistent storage
- Product images use Unsplash placeholder URLs
