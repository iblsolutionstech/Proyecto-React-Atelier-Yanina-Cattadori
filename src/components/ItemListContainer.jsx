import { useEffect, useState } from 'react'
import { getProducts } from '../mock/asyncMock.js'
import ItemList from './ItemList.jsx'

function ItemListContainer({ greeting }) {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts()
      setItems(products)
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <main className="item-list-container">
      <section className="welcome-panel">
        <p className="eyebrow">Moda circular y diseno responsable</p>
        <h1>{greeting}</h1>
        <p>
          Arreglos, transformaciones y prendas intervenidas para darle una nueva vida a cada
          pieza.
        </p>
      </section>

      <section className="catalog-section" aria-label="Catalogo de productos">
        {isLoading ? <p className="loading-message">Cargando productos...</p> : <ItemList products={items} />}
      </section>
    </main>
  )
}

export default ItemListContainer
