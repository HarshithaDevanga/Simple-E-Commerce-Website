import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function ProductDetail({ cartCount, addToCart }) {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      fetch(`/api/products?id=${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching product:', err)
          setLoading(false)
        })
    }
  }, [id])

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    alert('Product added to cart!')
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="loading">Loading product...</div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found</title>
        </Head>
        <div className="container">
          <h1>Product not found</h1>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} - ShopNow</title>
        <meta name="description" content={product.description} />
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
          <Link href="/" className="back-link">← Back to Products</Link>
          
          <div className="product-detail">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="product-detail-info">
              <h1 className="product-detail-name">{product.name}</h1>
              <p className="product-detail-price">${product.price.toFixed(2)}</p>
              <p className="product-detail-description">{product.description}</p>
              <p className="product-detail-category">Category: {product.category}</p>
              <p className="product-detail-stock">In Stock: {product.stock} units</p>
              
              <div className="product-detail-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                </div>
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
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
