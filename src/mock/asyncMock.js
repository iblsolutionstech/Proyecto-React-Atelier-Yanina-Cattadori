export const products = [
  {
    id: 'yc-remiendo-denim',
    name: 'Remiendo visible denim',
    price: 8500,
    category: 'Arreglos',
    img: '/products/remiendo-denim.jpg',
    stock: 8,
    description: 'Intervencion artesanal para reforzar jeans, camperas y prendas de denim.',
    details: 'Incluye evaluacion de la zona danada, refuerzo interior y terminacion visible con costuras decorativas.',
    estimatedTime: '3 a 5 dias habiles',
  },
  {
    id: 'yc-transformacion-camisa',
    name: 'Transformacion de camisa',
    price: 14500,
    category: 'Transformaciones',
    img: '/products/transformacion-camisa.jpg',
    stock: 5,
    description: 'Redisenio de una camisa en desuso para convertirla en una pieza actual.',
    details: 'El servicio contempla una propuesta de diseno, ajuste de molderia y terminaciones realizadas a medida.',
    estimatedTime: '5 a 7 dias habiles',
  },
  {
    id: 'yc-bolso-retazos',
    name: 'Bolso con retazos textiles',
    price: 18200,
    category: 'Accesorios textiles',
    img: '/products/bolso-retazos.jpg',
    stock: 4,
    description: 'Bolso confeccionado con recortes recuperados de talleres y prendas antiguas.',
    details: 'Cada bolso combina textiles seleccionados, forreria recuperada y manijas reforzadas para uso cotidiano.',
    estimatedTime: 'Entrega en 3 dias habiles',
  },
  {
    id: 'yc-falda-reciclada',
    name: 'Falda reciclada',
    price: 22000,
    category: 'Prendas recicladas',
    img: '/products/falda-reciclada.jpg',
    stock: 3,
    description: 'Prenda unica creada a partir de telas recuperadas y terminaciones a medida.',
    details: 'La composicion aprovecha materiales textiles existentes y puede incluir pequenas variaciones propias del proceso artesanal.',
    estimatedTime: 'Entrega en 4 dias habiles',
  },
  {
    id: 'yc-ajuste-sastrero',
    name: 'Ajuste sastrero',
    price: 12000,
    category: 'Arreglos',
    img: '/products/ajuste-sastrero.jpg',
    stock: 10,
    description: 'Compostura y ajuste de prendas para mejorar calce, largo y comodidad.',
    details: 'Incluye prueba inicial, marcado personalizado y correcciones de terminacion segun el tipo de prenda.',
    estimatedTime: '2 a 4 dias habiles',
  },
]

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000)
  })
}
