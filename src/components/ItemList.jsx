import Item from './Item.jsx'
import PropTypes from 'prop-types'

function ItemList({ products }) {
  return (
    <div className="product-grid rail">
      {products.map((product, index) => (
        <Item key={product.id} product={product} index={index} layout="rail" />
      ))}
    </div>
  )
}

ItemList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default ItemList
