import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { createRoot } from 'react-dom/client'
import '@fontsource/young-serif/400.css'
import '@fontsource/alegreya-sans/400.css'
import '@fontsource/alegreya-sans/400-italic.css'
import '@fontsource/alegreya-sans/500.css'
import '@fontsource/alegreya-sans/700.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
<StrictMode>
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</StrictMode>
)
