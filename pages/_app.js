import '../styles/globals.css'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load cart from API on mount
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        setCart(data)
        setCartCount(data.reduce((sum, item) => sum + item.quantity, 0))
      })
  }, [])

  const addToCart = async (productId, quantity = 1) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
    const updatedCart = await response.json()
    setCart(updatedCart)
    setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
  }

  const updateCart = async (productId, quantity) => {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    })
    const updatedCart = await response.json()
    setCart(updatedCart)
    setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
  }

  const removeFromCart = async (productId) => {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    const updatedCart = await response.json()
    setCart(updatedCart)
    setCartCount(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
  }

  return (
    <Component 
      {...pageProps} 
      cart={cart}
      cartCount={cartCount}
      addToCart={addToCart}
      updateCart={updateCart}
      removeFromCart={removeFromCart}
    />
  )
}
