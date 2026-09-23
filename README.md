# Atelier Yanina Cattadori · React

Proyecto web desarrollado con React para un atelier de moda circular, arreglos de ropa, transformación de prendas y diseño de indumentaria.

La aplicación está organizada por componentes y utiliza Vite como entorno de desarrollo.

## Componentes principales

- Navbar: muestra la marca del atelier, categorías de productos y el acceso al carrito.
- CartWidget: muestra un ícono de carrito con una cantidad fija de productos.
- ItemListContainer: recibe un mensaje de bienvenida mediante props, obtiene productos de forma asíncrona y guarda el resultado en estado.
- ItemList: recibe los productos por props y los recorre con map para renderizar el listado.
- Item: muestra la información resumida de cada producto en una card.
- ItemDetailContainer: obtiene un producto por su identificador y administra los estados de carga y error.
- ItemDetail: presenta la información completa del producto seleccionado.
- ItemCount: controla la cantidad elegida sin superar el stock disponible ni disminuir por debajo de cero.

## Simulación de datos

La carga de productos se simula en `src/mock/asyncMock.js` con una función `getProducts` que devuelve una Promise. Esa Promise usa `setTimeout` para resolver después de 2 segundos y entregar un array de productos con id, name, price, category, img, stock y description.

La función `getProductById`, ubicada en `src/services/getProductById.js`, recibe un identificador, busca el producto correspondiente en el mismo catálogo y devuelve una Promise. La vista de detalle utiliza temporalmente un identificador definido en `App.jsx`; más adelante podrá reemplazarse por el valor de una ruta dinámica.

## Tecnologías

- React
- JavaScript
- Vite
- HTML
- CSS

## Estructura

El proyecto separa la interfaz en componentes reutilizables para facilitar el mantenimiento y permitir seguir ampliando funcionalidades sin concentrar toda la lógica en un único archivo.

## Ejecutar localmente

Instalar dependencias:

```bash
npm install
```

Iniciar el entorno de desarrollo:

```bash
npm run dev
```

Luego abrir en el navegador la dirección local indicada por Vite.

## Objetivo

Continuar desarrollando una experiencia simple y clara para presentar productos y servicios del atelier, incorporando nuevas secciones y funcionalidades a medida que avance el proyecto.
