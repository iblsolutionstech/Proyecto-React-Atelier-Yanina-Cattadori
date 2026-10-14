import { describe, expect, it } from 'vitest'
import { validateBuyer } from './validateBuyer.js'

const validBuyer = {
  fullName: 'Ana Pérez',
  phone: '+54 11 1234-5678',
  address: 'Calle 123',
  city: 'Rosario',
}

describe('validación de datos de entrega', () => {
  it('rechaza datos faltantes y teléfonos inválidos', () => {
    expect(validateBuyer({ ...validBuyer, fullName: ' ' }).error).toContain('nombre')
    expect(validateBuyer({ ...validBuyer, phone: 'abc' }).error).toContain('teléfono')
    expect(validateBuyer({ ...validBuyer, address: 'A' }).error).toContain('dirección')
    expect(validateBuyer({ ...validBuyer, city: ' ' }).error).toContain('ciudad')
  })

  it('limpia los espacios antes de guardar una compra válida', () => {
    expect(validateBuyer({ ...validBuyer, fullName: '  Ana Pérez  ' })).toEqual({
      error: '',
      buyer: validBuyer,
    })
  })
})
