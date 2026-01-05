import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Cart({ cart, cartCount, updateCart, removeFromCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [])

  const getCartItems = () => {
    return cart.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId)
      return {
        ...cartItem,
        product
      }
    }).filter(item => item.product)
  }

  const calculateTotal = () => {
    return getCartItems().reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  const cartItems = getCartItems()
  const total = calculateTotal()

  if (loading) {
    return (
      <>
        <Head>
          <title>Shopping Cart - ShopNow</title>
        </Head>
        <div className="loading">Loading cart...</div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - ShopNow</title>
      </Head>

      <header className="header">
        <div className="container">
          <h1 className="logo">ShopNow</h1>
          <nav>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/cart" className="nav-link cart-link">
              Cart ({cartCount})
            </Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <h2 className="page-title">Shopping Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <Link href="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.product.name}</h3>
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <label htmlFor={`qty-${item.productId}`}>Qty:</label>
                      <input
                        type="number"
                        id={`qty-${item.productId}`}
                        min="1"
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 1
                          updateCart(item.productId, newQty)
                        }}
                        className="quantity-input"
                      />
                    </div>
                    <div className="cart-item-total">
                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                  <Link href="/" className="btn btn-secondary">Continue Shopping</Link>
                  <button className="btn btn-primary btn-large">Checkout</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 ShopNow. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
