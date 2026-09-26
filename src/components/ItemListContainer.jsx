import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { getProducts } from '../mock/asyncMock.js'
import { categories } from '../mock/asyncMock.js'
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

  const heading = selectedCategory ? selectedCategory.name : greeting
  const description = selectedCategory
    ? `Servicios y piezas de ${selectedCategory.name.toLowerCase()} disponibles en el atelier.`
    : 'Arreglos, transformaciones y prendas intervenidas para darle una nueva vida a cada pieza.'

  return (
    <main className="item-list-container">
      <section className="welcome-panel">
        <p className="eyebrow">Moda circular y diseno responsable</p>
        <h1>{heading}</h1>
        <p>{description}</p>
      </section>

      <section className="catalog-section" aria-label="Catalogo de productos">
        <div className="catalog-toolbar">
          <p>{selectedCategory ? `${items.length} opciones en esta categoria` : `${items.length} servicios y piezas disponibles`}</p>
          {selectedCategory && <Link to="/">Ver todo el catalogo</Link>}
        </div>
        {isLoading ? (
          <p className="loading-message">Cargando catalogo...</p>
        ) : items.length > 0 ? (
          <ItemList products={items} />
        ) : (
          <div className="empty-catalog">
            <h2>Esta categoria todavia no tiene productos disponibles</h2>
            <Link to="/">Volver al catalogo completo</Link>
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
