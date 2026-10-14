import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../constants/categories.js'
import { getItems } from '../services/itemsService.js'
import HomeHero from './HomeHero.jsx'
import ItemList from './ItemList.jsx'

const categoryVisuals = {
  arreglos: '/products/ajuste-sastrero.jpg',
  transformaciones: '/products/transformacion-camisa.jpg',
  'prendas-recicladas': '/products/falda-reciclada.jpg',
  'accesorios-textiles': '/products/bolso-retazos.jpg',
}

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  )

  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setIsLoading(true)
      setError('')

      try {
        const products = await getItems(categoryId)

        if (isActive) {
          setItems(products)
        }
      } catch (requestError) {
        if (isActive) {
          setError('No se pudo cargar el catalogo. Intentá nuevamente.')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [categoryId, reloadKey])

  const heading = selectedCategory ? selectedCategory.name : greeting
  const description = selectedCategory
    ? `Servicios y piezas de ${selectedCategory.name.toLowerCase()} disponibles en el atelier.`
    : 'Arreglos, transformaciones y prendas intervenidas para darle una nueva vida a cada pieza.'

  return (
    <main className="item-list-container">
      {selectedCategory ? (
        <section className="welcome-panel">
          <h1>{heading}</h1>
          <p>{description}</p>
        </section>
      ) : (
        <>
          <HomeHero />
          <section
            className="service-explorer"
            aria-labelledby="service-explorer-title"
          >
            <div className="section-intro">
              <h2 id="service-explorer-title">
                Cada prenda tiene una segunda posibilidad
              </h2>
              <p>
                Elegí el punto de partida. El resto se trabaja en el atelier,
                a medida de cada historia.
              </p>
            </div>

            <div className="service-links">
              {categories.map((category) => (
                <Link
                  className={`service-link service-link-${category.id}`}
                  to={`/category/${category.id}`}
                  key={category.id}
                >
                  <img src={categoryVisuals[category.id]} alt="" />
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <strong>
                      Explorar <ArrowUpRight aria-hidden="true" size={15} />
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <section
        className="catalog-section"
        id="catalogo"
        aria-label="Catalogo de productos"
      >
        {!selectedCategory && (
          <h2 className="catalog-title">Catalogo del atelier</h2>
        )}

        <div className="catalog-toolbar">
          <p>
            {selectedCategory
              ? `${items.length} opciones en esta categoria`
              : `${items.length} servicios y piezas disponibles`}
          </p>
          {selectedCategory && <Link to="/">Ver todo el catalogo</Link>}
        </div>

        {error ? (
          <div className="empty-catalog">
            <h2>{error}</h2>
            <button className="text-action" type="button" onClick={() => setReloadKey((key) => key + 1)}>
              Reintentar carga
            </button>
          </div>
        ) : isLoading ? (
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
