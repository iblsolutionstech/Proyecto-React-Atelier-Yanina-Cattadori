import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../mock/asyncMock.js'
import { getProductKind, productKindLabels } from '../utils/productKind.js'

const categoryVisuals = {
  arreglos: '/products/ajuste-sastrero.jpg',
  transformaciones: '/products/transformacion-camisa.jpg',
  'prendas-recicladas': '/products/falda-reciclada.jpg',
  'accesorios-textiles': '/products/bolso-retazos.jpg',
}

function CategoryRack() {
  return (
    <section className="rack" aria-labelledby="rack-title">
      <div className="faja" aria-hidden="true" />
      <div className="section-intro">
        <h2 id="rack-title">Cada prenda tiene una segunda posibilidad</h2>
        <p>Elegí el punto de partida. El resto se trabaja en el atelier, a medida de cada historia.</p>
      </div>

      <div className="rack-bar" aria-hidden="true" />
      <ul className="rack-items">
        {categories.map((category) => {
          const kind = getProductKind(category.name)
          return (
            <li key={category.id}>
              <Link className={`tela tela-${category.id} kind-${kind}`} to={`/category/${category.id}`}>
                <span className="tela-band" aria-hidden="true" />
                <span className="tela-photo">
                  <img src={categoryVisuals[category.id]} alt="" loading="lazy" />
                </span>
                <span className="tela-text">
                  <span className="tela-name">{category.name}</span>
                  <span className="tela-kind">{productKindLabels[kind]}</span>
                  <span className="tela-description">{category.description}</span>
                  <span className="tela-cta">Explorar <ArrowUpRight aria-hidden="true" size={15} /></span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CategoryRack
