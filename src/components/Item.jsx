import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function Item({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/item/${product.id}`} aria-label={`Ver detalle de ${product.name}`}>
        <img className="product-image" src={product.img} alt={product.name} />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h2><Link to={`/item/${product.id}`}>{product.name}</Link></h2>
        <div className="product-meta">
          <strong>{currencyFormatter.format(product.price)}</strong>
        </div>
        <Link className="product-detail-link" to={`/item/${product.id}`}>Ver detalle</Link>
      </div>
    </article>
  )
}

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
}

export default Item
