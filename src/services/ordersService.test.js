import { beforeEach, describe, expect, it, vi } from 'vitest'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { createOrder } from './ordersService.js'

vi.mock('../firebase/config', () => ({ db: { id: 'test-db' } }))
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(() => 'orders-collection'),
  serverTimestamp: vi.fn(() => 'server-time'),
}))

describe('creación de órdenes', () => {
  beforeEach(() => vi.clearAllMocks())

  it('guarda la compra con usuario, comprador, cantidades y fecha del servidor', async () => {
    addDoc.mockResolvedValue({ id: 'orden-123' })
    const buyer = { fullName: 'Ana Pérez', phone: '1234', address: 'Calle 1', city: 'Rosario' }
    const cart = [{ id: 'remiendo-1', name: 'Remiendo visible denim', price: 8500, quantity: 2, stock: 8 }]

    await expect(createOrder({
      user: { uid: 'usuario-1', email: 'ana@example.com' },
      buyer,
      cart,
      total: 17000,
    })).resolves.toEqual({ id: 'orden-123' })

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'orders')
    expect(serverTimestamp).toHaveBeenCalledOnce()
    expect(addDoc).toHaveBeenCalledWith('orders-collection', {
      userId: 'usuario-1',
      userEmail: 'ana@example.com',
      buyer,
      items: [{ id: 'remiendo-1', name: 'Remiendo visible denim', price: 8500, quantity: 2 }],
      total: 17000,
      createdAt: 'server-time',
    })
  })
})
