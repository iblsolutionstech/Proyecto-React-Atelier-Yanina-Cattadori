import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/getProductById.js'
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
    return <p className="detail-status">Cargando detalle del producto...</p>
  }

  if (error) {
    return (
      <section className="detail-status detail-status-error">
        <p>{error}</p>
        <Link to="/">Volver al catalogo</Link>
      </section>
    )
  }

  return (
    <section className="product-detail-section" aria-labelledby="product-detail-title">
      <div className="product-detail-heading">
        <p className="eyebrow">Servicio destacado</p>
        <h2 id="product-detail-title">Detalle del producto</h2>
      </div>
      <ItemDetail product={product} />
    </section>
  )
}

export default ItemDetailContainer
