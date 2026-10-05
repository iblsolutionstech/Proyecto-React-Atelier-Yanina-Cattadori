import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { currencyFormatter, getProductKind, productKindLabels } from '../utils/productKind.js'
import { getFrame } from './frameSequence.js'

function Item({ product, index, layout }) {
  const { addItem, cart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const { slot, frame, tilt } = getFrame(index)
  const kind = getProductKind(product.category)
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const isSoldOut = product.stock <= 0
  const isMaxedOut = !isSoldOut && quantityInCart >= product.stock

  useEffect(() => {
    if (!justAdded) return undefined
    const timer = setTimeout(() => setJustAdded(false), 1800)
    return () => clearTimeout(timer)
  }, [justAdded])

  const handleAdd = () => {
    addItem(product, 1)
    setJustAdded(true)
  }

  const classes = [
    'product-card',
    'hang',
    `slot-${slot}`,
    `frame-type-${frame}`,
    `kind-${kind}`,
    layout === 'wall' && index === 2 ? 'slot-c-first' : '',
    isSoldOut ? 'is-sold-out' : '',
  ].filter(Boolean).join(' ')

  let addLabel = 'Agregar'
  if (isSoldOut) addLabel = 'Sin stock'
  else if (justAdded) addLabel = 'Agregado'
  else if (isMaxedOut) addLabel = 'En tu bolsa'

  return (
    <article
      className={classes}
      style={{ '--tilt': `${layout === 'rail' ? tilt * 0.5 : tilt}deg`, '--i': index }}
    >
      <Link className="product-image-link frame" to={`/item/${product.id}`} aria-label={`Ver detalle de ${product.name}`}>
        <span className="frame-window">
          <img className="product-image" src={product.img} alt={product.name} loading={index > 2 ? 'lazy' : 'eager'} />
        </span>
      </Link>
      <div className="product-info">
        <h2><Link to={`/item/${product.id}`}>{product.name}</Link></h2>
        <p className="product-kind-line">
          <span className="kind-swatch" aria-hidden="true" />
          <span className="product-category">{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{productKindLabels[kind]}</span>
        </p>
        <div className="product-meta">
          <strong className="price">{currencyFormatter.format(product.price)}</strong>
          {product.estimatedTime && <span className="product-time">{product.estimatedTime}</span>}
        </div>
        <div className="product-actions">
          <button
            type="button"
            className={justAdded ? 'add-button add-button-done' : 'add-button'}
            onClick={handleAdd}
            disabled={isSoldOut || isMaxedOut}
            aria-label={isSoldOut ? `${product.name} sin stock` : `Agregar ${product.name} al carrito`}
          >
            {justAdded && <Check aria-hidden="true" size={16} strokeWidth={2.2} />}
            {addLabel}
          </button>
          <Link className="product-detail-link" to={`/item/${product.id}`}>Ver detalle <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
        <span className="visually-hidden" aria-live="polite">{justAdded ? `${product.name} agregado al carrito` : ''}</span>
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
    stock: PropTypes.number.isRequired,
    estimatedTime: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  layout: PropTypes.oneOf(['wall', 'rail']).isRequired,
}

export default Item
