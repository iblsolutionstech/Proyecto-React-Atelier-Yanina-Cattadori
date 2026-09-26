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

## Validaciones y pruebas

Los componentes que reciben props validan los datos esperados mediante PropTypes. Se incorporaron pruebas automatizadas para `getProductById`, que verifican la búsqueda dinámica de productos y la respuesta ante un identificador inexistente.

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

Para ejecutar las pruebas:

```bash
npm test
```

## Objetivo

Continuar desarrollando una experiencia simple y clara para presentar productos y servicios del atelier, incorporando nuevas secciones y funcionalidades a medida que avance el proyecto.

## Créditos de imágenes

Las fotografías utilizadas pertenecen a Wikimedia Commons:

- [Remiendo visible](https://commons.wikimedia.org/wiki/File:Visibly_mended_pair_of_jeans.jpg): Lisenka92, licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Prenda transformada](https://commons.wikimedia.org/wiki/File:%D7%9E%D7%99%D7%97%D7%96%D7%95%D7%A8_%D7%9E%D7%A9%D7%91%D7%99%D7%97_%D7%9C%D7%91%D7%92%D7%93%D7%99%D7%9D_%D7%99%D7%A9%D7%A0%D7%99%D7%9D_%D7%95%D7%9B%D7%9E%D7%94_%D7%A9%D7%90%D7%A8%D7%99%D7%95%D7%AA_%D7%91%D7%93_%D7%99%D7%A6%D7%A8%D7%95_%D7%A9%D7%9E%D7%9C%D7%94_%D7%97%D7%93%D7%A9%D7%94.jpg): Mirjammarion, licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Bolso textil](https://commons.wikimedia.org/wiki/File:016Aa._Cosmetic_bag.jpg): GAlexandrova, licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Prenda patchwork](https://commons.wikimedia.org/wiki/File:Cotton_patchwork_suit_by_Alexander_McQueen,_2004_02.jpg): Rhode Island School of Design Museum of Art, licencia [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Trabajo de sastrería](https://commons.wikimedia.org/wiki/File:Tailor_sewing_machine.jpg): Sajid213, licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
