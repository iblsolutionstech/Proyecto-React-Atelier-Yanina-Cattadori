import ItemCount from './ItemCount.jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function ItemDetail({ product }) {
  const { addItem } = useCart()
  const [wasAdded, setWasAdded] = useState(false)

  const handleAdd = (quantity) => {
    addItem(product, quantity)
    setWasAdded(true)
  }

  return (
    <article className="product-detail">
      <div className="product-detail-image-wrapper">
        <img className="product-detail-image" src={product.img} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <span className="product-category">{product.category}</span>
        <h2>{product.name}</h2>
        <strong className="product-detail-price">{currencyFormatter.format(product.price)}</strong>
        <p>{product.description}</p>
        <p className="product-detail-description">{product.details}</p>

        <dl className="product-detail-data">
          <div>
            <dt>Disponibilidad</dt>
            <dd>{product.stock} unidades</dd>
          </div>
          <div>
            <dt>Tiempo estimado</dt>
            <dd>{product.estimatedTime}</dd>
          </div>
        </dl>

        <ItemCount stock={product.stock} onAdd={handleAdd} />
        {wasAdded && (
          <Link className="detail-cart-link" to="/cart">Ver carrito</Link>
        )}
      </div>
    </article>
  )
}

ItemDetail.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    estimatedTime: PropTypes.string.isRequired,
  }).isRequired,
}

export default ItemDetail
