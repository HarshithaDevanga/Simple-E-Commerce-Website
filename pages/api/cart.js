// In-memory cart storage (in production, use a database)
let cart = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(cart);
  } else if (req.method === 'POST') {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    res.status(200).json(cart);
  } else if (req.method === 'PUT') {
    const { productId, quantity } = req.body;
    
    const item = cart.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        cart = cart.filter(item => item.productId !== productId);
      } else {
        item.quantity = quantity;
      }
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } else if (req.method === 'DELETE') {
    const { productId } = req.body;
    
    cart = cart.filter(item => item.productId !== productId);
    res.status(200).json(cart);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
