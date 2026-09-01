import CartWidget from './CartWidget.jsx'

const categories = ['Arreglos', 'Transformaciones', 'Prendas recicladas', 'Accesorios textiles']

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="YaninaCattadori">
        YaninaCattadori
      </a>

      <nav className="category-nav" aria-label="Categorias de productos">
        {categories.map((category) => (
          <a href={`#${category.toLowerCase().replaceAll(' ', '-')}`} key={category}>
            {category}
          </a>
        ))}
      </nav>

      <CartWidget />
    </header>
  )
}

export default Navbar
