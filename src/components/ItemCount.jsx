import { useState } from 'react'

function ItemCount({ stock }) {
  const [quantity, setQuantity] = useState(0)

  const decrease = () => {
    setQuantity((currentQuantity) => Math.max(0, currentQuantity - 1))
  }

  const increase = () => {
    setQuantity((currentQuantity) => Math.min(stock, currentQuantity + 1))
  }

  return (
    <div className="item-count" aria-label="Selector de cantidad">
      <p className="item-count-label">Cantidad</p>
      <div className="item-count-controls">
        <button type="button" onClick={decrease} disabled={quantity === 0} aria-label="Restar una unidad">
          -
        </button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" onClick={increase} disabled={quantity === stock} aria-label="Sumar una unidad">
          +
        </button>
      </div>
      <small>Disponible: {stock}</small>
    </div>
  )
}

export default ItemCount
