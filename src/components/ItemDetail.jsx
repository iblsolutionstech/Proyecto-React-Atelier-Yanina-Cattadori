import ItemCount from './ItemCount.jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { currencyFormatter, getProductKind, productKindLabels } from '../utils/productKind.js'

function ItemDetail({ product }) {
  const { addItem } = useCart()
  const [wasAdded, setWasAdded] = useState(false)
  const kind = getProductKind(product.category)

  const handleAdd = (quantity) => {
    addItem(product, quantity)
    setWasAdded(true)
  }

  return (
    <article className={`product-detail kind-${kind}`}>
      <div className="product-detail-image-wrapper hang frame-type-wood" style={{ '--tilt': '-0.4deg' }}>
        <div className="frame">
          <span className="frame-window">
            <img className="product-detail-image" src={product.img} alt={product.name} />
          </span>
        </div>
      </div>

      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="product-kind-line">
          <span className="kind-swatch" aria-hidden="true" />
          <span className="product-category">{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{productKindLabels[kind]}</span>
        </p>
        <strong className="product-detail-price">{currencyFormatter.format(product.price)}</strong>
        <p className="product-detail-lead">{product.description}</p>
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
          <Link className="detail-cart-link secondary-action" to="/cart">Ver carrito</Link>
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
