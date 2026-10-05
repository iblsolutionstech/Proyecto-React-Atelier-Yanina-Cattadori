import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Lamp from './Lamp.jsx'
import Navbar from './Navbar.jsx'

function Layout() {
  return (
    <div className="app-shell">
      <Lamp />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
