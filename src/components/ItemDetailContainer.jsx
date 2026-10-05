import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/getProductById.js'
import EmptyFrame from './EmptyFrame.jsx'
import ItemDetail from './ItemDetail.jsx'

function ItemDetailContainer() {
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    setProduct(null)
    setError('')
    setIsLoading(true)

    getProductById(itemId)
      .then((selectedProduct) => {
        if (isActive) {
          setProduct(selectedProduct)
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [itemId])

  if (isLoading) {
    return (
      <section className="detail-status">
        <EmptyFrame />
        <p role="status">Cargando detalle del producto...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="detail-status detail-status-error">
        <EmptyFrame variant="fallen" />
        <p role="alert">{error}</p>
        <Link className="secondary-action" to="/">Volver al catalogo</Link>
      </section>
    )
  }

  return (
    <section className="product-detail-section" aria-labelledby="product-detail-title">
      <div className="product-detail-heading visually-hidden">
        <h2 id="product-detail-title">Detalle del producto</h2>
      </div>
      <ItemDetail product={product} />
    </section>
  )
}

export default ItemDetailContainer
