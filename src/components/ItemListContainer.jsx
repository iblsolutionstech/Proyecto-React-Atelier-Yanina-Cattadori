function ItemListContainer({ greeting }) {
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
    </main>
  )
}

export default ItemListContainer
