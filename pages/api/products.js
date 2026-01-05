// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    stock: 15
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    description: "Feature-rich smartwatch with fitness tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    stock: 8
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand for better posture",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "Accessories",
    stock: 20
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB mechanical keyboard with cherry MX switches",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "Electronics",
    stock: 12
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 39.99,
    description: "Ergonomic wireless mouse with long battery life",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    category: "Accessories",
    stock: 25
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 59.99,
    description: "Multi-port USB-C hub with HDMI and card reader",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500",
    category: "Accessories",
    stock: 18
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    
    if (id) {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } else {
      res.status(200).json(products);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
