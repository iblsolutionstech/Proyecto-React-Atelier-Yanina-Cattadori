# Atelier Yanina Cattadori

Tienda de moda circular y servicios de arreglos, transformaciones y accesorios textiles. Construida con React, Vite, Firebase Authentication y Cloud Firestore.

## Tecnologías

React, React Router, JavaScript, Vite, Firebase Authentication, Cloud Firestore y CSS.

## Funcionalidades

- Catálogo y categorías obtenidos de la colección `items` de Firestore.
- Detalle de producto consultado por el identificador del documento.
- Carrito con control de cantidad según el stock mostrado y cálculo de totales.
- Registro e ingreso con correo y contraseña mediante Firebase Authentication.
- Checkout protegido. Una compra exitosa crea un documento en `orders`, muestra su ID y vacía el carrito.
- Estados de carga, error, catálogo vacío y ruta inexistente.

## Configuración local

1. Ejecutá `npm install`.
2. Copiá `.env.example` a `.env` y completá las seis variables del proyecto Firebase. El archivo `.env` está ignorado por Git. Los valores de configuración del cliente identifican el proyecto; las reglas de Firestore y Authentication controlan el acceso.
3. En la consola de Firebase, habilitá **Authentication → Email/Password** y creá la base de datos **Cloud Firestore**.
4. Cargá documentos en `items` con los campos indicados abajo. Configurá las reglas de Firestore para permitir la lectura del catálogo y la creación de órdenes por usuarios autenticados, de acuerdo con la política de tu proyecto.
5. Ejecutá `npm run dev` y abrí la URL indicada por Vite.

Cada documento de `items` usa su ID de Firestore para la ruta `/item/:itemId` y contiene:

| Campo | Tipo | Uso |
| --- | --- | --- |
| `Nombre` | string | Nombre del producto o servicio |
| `Precio` | number | Precio en pesos argentinos |
| `Categoria` | string | Etiqueta visible |
| `IdCategoria` | string | Filtro de categoría: `arreglos`, `transformaciones`, `prendas-recicladas` o `accesorios-textiles` |
| `Imagen` | string | URL o ruta pública de la imagen |
| `Stock` | number | Cantidad disponible |
| `Descripcion` | string | Resumen |
| `Detalle` | string | Descripción ampliada |
| `TiempoEstimado` | string | Plazo mostrado en el detalle |

Ejemplo de documento en `items` (el ID se asigna al documento):

```json
{
  "Nombre": "Remiendo visible denim",
  "Precio": 8500,
  "Categoria": "Arreglos",
  "IdCategoria": "arreglos",
  "Imagen": "/products/remiendo-denim.jpg",
  "Stock": 8,
  "Descripcion": "Intervención artesanal en denim",
  "Detalle": "Refuerzo y terminación visible",
  "TiempoEstimado": "3 a 5 días hábiles"
}
```

Las órdenes se guardan en `orders` con `userId`, `userEmail`, `buyer` (nombre, teléfono, dirección y ciudad), `items` (ID, nombre, precio y cantidad), `total` y `createdAt` generado por el servidor. El checkout muestra el ID devuelto por Firestore únicamente después de una escritura exitosa.

Ejemplo de estructura de una orden:

```json
{
  "userId": "uid-del-usuario",
  "userEmail": "cliente@example.com",
  "buyer": {
    "fullName": "Cliente de ejemplo",
    "phone": "+54 11 1234-5678",
    "address": "Calle 123",
    "city": "Rosario"
  },
  "items": [
    { "id": "id-del-producto", "name": "Remiendo visible denim", "price": 8500, "quantity": 1 }
  ],
  "total": 8500,
  "createdAt": "Timestamp de Firestore generado por serverTimestamp()"
}
```

## Rutas

- `/`: catálogo completo.
- `/category/:categoryId`: productos de una categoría.
- `/item/:itemId`: detalle de un producto.
- `/cart`: carrito.
- `/login` y `/registro`: acceso y creación de cuenta.
- `/checkout`: compra, accesible con sesión iniciada.
- `*`: página 404.

Si una persona sin sesión intenta abrir `/checkout`, se la envía a `/login` y, al ingresar o registrarse, vuelve al checkout.

## Comandos de desarrollo

```bash
npm test
npm run build
npm run test:e2e
```

El recorrido automatizado usa la configuración Firebase local y requiere datos en `items`. La compra real también depende de las reglas y servicios habilitados en Firebase.

## Imágenes

Las fotografías del catálogo están en `public/products` y proceden de Wikimedia Commons:

- [Remiendo visible](https://commons.wikimedia.org/wiki/File:Visibly_mended_pair_of_jeans.jpg): Lisenka92, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Prenda transformada](https://commons.wikimedia.org/wiki/File:%D7%9E%D7%99%D7%97%D7%96%D7%95%D7%A8_%D7%9E%D7%A9%D7%91%D7%99%D7%97_%D7%9C%D7%91%D7%92%D7%93%D7%99%D7%9D_%D7%99%D7%A9%D7%A0%D7%99%D7%9D_%D7%95%D7%9B%D7%9E%D7%94_%D7%A9%D7%90%D7%A8%D7%99%D7%95%D7%AA_%D7%91%D7%93_%D7%99%D7%A6%D7%A8%D7%95_%D7%A9%D7%9E%D7%9C%D7%94_%D7%97%D7%93%D7%A9%D7%94.jpg): Mirjammarion, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Bolso textil](https://commons.wikimedia.org/wiki/File:016Aa._Cosmetic_bag.jpg): GAlexandrova, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- [Prenda patchwork](https://commons.wikimedia.org/wiki/File:Cotton_patchwork_suit_by_Alexander_McQueen,_2004_02.jpg): Rhode Island School of Design Museum of Art, [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- [Trabajo de sastrería](https://commons.wikimedia.org/wiki/File:Tailor_sewing_machine.jpg): Sajid213, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
