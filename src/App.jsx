import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="Bienvenidos a YaninaCattadori" />
      <ItemDetailContainer productId="yc-transformacion-camisa" />
    </>
  )
}

export default App
