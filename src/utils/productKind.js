const SERVICE_CATEGORIES = ['Arreglos', 'Transformaciones']

export function getProductKind(category) {
  return SERVICE_CATEGORIES.includes(category) ? 'servicio' : 'pieza'
}

export const productKindLabels = {
  servicio: 'Servicio',
  pieza: 'Pieza terminada',
}

export const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})
