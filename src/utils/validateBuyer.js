export function validateBuyer(values) {
  const buyer = {
    fullName: values.fullName.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    city: values.city.trim(),
  }

  if (buyer.fullName.length < 2) {
    return { error: 'Ingresá tu nombre y apellido.', buyer }
  }

  if (!/^[+\d\s().-]+$/.test(buyer.phone) || buyer.phone.replace(/\D/g, '').length < 6) {
    return { error: 'Ingresá un teléfono válido de al menos 6 dígitos.', buyer }
  }

  if (buyer.address.length < 5) {
    return { error: 'Ingresá una dirección de entrega completa.', buyer }
  }

  if (buyer.city.length < 2) {
    return { error: 'Ingresá una ciudad válida.', buyer }
  }

  return { error: '', buyer }
}
