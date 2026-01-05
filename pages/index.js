import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Home({ cartCount, addToCart }) {
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

  return (
    <>
      <Head>
        <title>E-Commerce Store</title>
        <meta name="description" content="Shop the latest products" />
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
          <h2 className="page-title">Featured Products</h2>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <Link href={`/product/${product.id}`}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                  <button 
                    className="btn btn-primary"
                    onClick={() => addToCart(product.id, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
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
