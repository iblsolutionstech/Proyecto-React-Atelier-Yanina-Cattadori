import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getItemById } from '../services/itemsService.js'
import ItemDetail from './ItemDetail.jsx'

function ItemDetailContainer() {
  const { itemId } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadProduct() {
      setProduct(null)
      setError('')
      setIsLoading(true)

      try {
        const selectedProduct = await getItemById(itemId)

        if (isActive) {
          setProduct(selectedProduct)
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError.message === 'No se encontró el producto solicitado.'
            ? requestError.message
            : 'No se pudo cargar el producto. Revisá tu conexión e intentá nuevamente.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

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
    <section
      className="product-detail-section"
      aria-labelledby="product-detail-title"
    >
      <div className="product-detail-heading">
        <h2 id="product-detail-title">Detalle del producto</h2>
      </div>
      <ItemDetail product={product} />
    </section>
  )
}

export default ItemDetailContainer
