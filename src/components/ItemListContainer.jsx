import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../mock/asyncMock.js'
import { categories } from '../mock/asyncMock.js'
import CategoryRack from './CategoryRack.jsx'
import EmptyFrame from './EmptyFrame.jsx'
import HomeWall from './HomeWall.jsx'
import ItemList from './ItemList.jsx'

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const selectedCategory = categories.find((category) => category.id === categoryId)

  useEffect(() => {
    let isActive = true

    setIsLoading(true)

    const loadProducts = async () => {
      const products = await getProducts()

      if (isActive) {
        const filteredProducts = categoryId
          ? products.filter((product) => product.category === selectedCategory?.name)
          : products

        setItems(filteredProducts)
        setIsLoading(false)
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [categoryId, selectedCategory?.name])

  if (!selectedCategory) {
    return (
      <main className="item-list-container item-list-home" aria-label={greeting}>
        <HomeWall items={items} isLoading={isLoading} />
        <CategoryRack />
      </main>
    )
  }

  return (
    <main className="item-list-container">
      <section className="welcome-panel">
        <h1>{selectedCategory.name}</h1>
        <p>{`Servicios y piezas de ${selectedCategory.name.toLowerCase()} disponibles en el atelier.`}</p>
      </section>

      <section className="catalog-section" id="catalogo" aria-label="Catalogo de productos">
        <div className="catalog-toolbar">
          <p role="status">{isLoading ? 'Cargando catalogo...' : `${items.length} opciones en esta categoria`}</p>
          <Link to="/">Ver todo el catalogo</Link>
        </div>
        {isLoading ? (
          <div className="product-grid rail" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <div className={`hang wall-placeholder rail-placeholder rail-placeholder-${index}`} key={index}>
                <EmptyFrame />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <ItemList products={items} />
        ) : (
          <div className="empty-catalog">
            <EmptyFrame />
            <h2>Esta categoria todavia no tiene productos disponibles</h2>
            <Link className="secondary-action" to="/">Volver al catalogo completo</Link>
          </div>
        )}
      </section>
    </main>
  )
}

ItemListContainer.propTypes = {
  greeting: PropTypes.string.isRequired,
}

export default ItemListContainer
