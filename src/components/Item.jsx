import PropTypes from 'prop-types'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function Item({ product }) {
  return (
    <article className="product-card">
      <img className="product-image" src={product.img} alt={product.name} />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h2>{product.name}</h2>
        <div className="product-meta">
          <strong>{currencyFormatter.format(product.price)}</strong>
        </div>
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
