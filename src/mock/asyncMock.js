const products = [
  {
    id: 'yc-remiendo-denim',
    name: 'Remiendo visible denim',
    price: 8500,
    category: 'Arreglos',
    img: '/products/remiendo-denim.svg',
    stock: 8,
    description: 'Intervencion artesanal para reforzar jeans, camperas y prendas de denim.',
  },
  {
    id: 'yc-transformacion-camisa',
    name: 'Transformacion de camisa',
    price: 14500,
    category: 'Transformaciones',
    img: '/products/transformacion-camisa.svg',
    stock: 5,
    description: 'Redisenio de una camisa en desuso para convertirla en una pieza actual.',
  },
  {
    id: 'yc-bolso-retazos',
    name: 'Bolso con retazos textiles',
    price: 18200,
    category: 'Accesorios textiles',
    img: '/products/bolso-retazos.svg',
    stock: 4,
    description: 'Bolso confeccionado con recortes recuperados de talleres y prendas antiguas.',
  },
  {
    id: 'yc-falda-reciclada',
    name: 'Falda reciclada',
    price: 22000,
    category: 'Prendas recicladas',
    img: '/products/falda-reciclada.svg',
    stock: 3,
    description: 'Prenda unica creada a partir de telas recuperadas y terminaciones a medida.',
  },
  {
    id: 'yc-ajuste-sastrero',
    name: 'Ajuste sastrero',
    price: 12000,
    category: 'Arreglos',
    img: '/products/ajuste-sastrero.svg',
    stock: 10,
    description: 'Compostura y ajuste de prendas para mejorar calce, largo y comodidad.',
  },
]

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000)
  })
}
