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
        <p>{product.description}</p>
        <div className="product-meta">
          <strong>{currencyFormatter.format(product.price)}</strong>
          <span>Stock: {product.stock}</span>
        </div>
      </div>
    </article>
  )
}

export default Item
