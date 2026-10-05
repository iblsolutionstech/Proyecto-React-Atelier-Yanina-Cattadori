import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AccessRestricted from './components/AccessRestricted.jsx'
import Cart from './components/Cart.jsx'
import Layout from './components/Layout.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import ItemDetailContainer from './components/ItemDetailContainer.jsx'
import NotFound from './components/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const hasCheckoutAccess = false

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ItemListContainer greeting="Piezas con historia, hechas para seguir" />} />
          <Route path="category/:categoryId" element={<ItemListContainer greeting="Catalogo del atelier" />} />
          <Route path="item/:itemId" element={<ItemDetailContainer />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="checkout"
            element={(
              <ProtectedRoute isAllowed={hasCheckoutAccess}>
                <section className="checkout-placeholder">
                  <h1>Checkout</h1>
                </section>
              </ProtectedRoute>
            )}
          />
          <Route path="acceso-restringido" element={<AccessRestricted />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
