import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthPage.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import Layout from './components/Layout.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import NotFound from './components/NotFound.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="registro" element={<AuthPage mode="register" />} />
          <Route index element={<ItemListContainer greeting="Piezas con historia, hechas para seguir" />} />
          <Route path="category/:categoryId" element={<ItemListContainer greeting="Catalogo del atelier" />} />
          <Route path="item/:itemId" element={<ItemDetailContainer />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
