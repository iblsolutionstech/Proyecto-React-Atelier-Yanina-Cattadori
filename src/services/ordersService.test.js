import { beforeEach, describe, expect, it, vi } from 'vitest'
import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { createOrder } from './ordersService.js'

vi.mock('../firebase/config', () => ({ db: { id: 'test-db' } }))
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'orders-collection'),
  doc: vi.fn((reference) => reference === 'orders-collection'
    ? { id: 'orden-interna' }
    : { id: 'orderSequence' }),
  runTransaction: vi.fn(),
  serverTimestamp: vi.fn(() => 'server-time'),
}))

const buyer = { fullName: 'Ana Pérez', phone: '1234', address: 'Calle 1', city: 'Rosario' }
const cart = [{ id: 'remiendo-1', name: 'Remiendo visible denim', price: 8500, quantity: 2, stock: 8 }]
const user = { uid: 'usuario-1', email: 'ana@example.com' }

describe('creación de órdenes', () => {
  beforeEach(() => vi.clearAllMocks())

  it.each([
    { lastNumber: 0, expectedNumber: '000001' },
    { lastNumber: 1, expectedNumber: '000002' },
  ])('asigna el número $expectedNumber junto con la compra', async ({ lastNumber, expectedNumber }) => {
    const transaction = {
      get: vi.fn().mockResolvedValue({
        exists: () => lastNumber > 0,
        data: () => ({ lastNumber }),
      }),
      set: vi.fn(),
    }
    runTransaction.mockImplementation((_, update) => update(transaction))

    await expect(createOrder({ user, buyer, cart, total: 17000 }))
      .resolves.toEqual({ id: 'orden-interna', number: expectedNumber })

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'orders')
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'metadata', 'orderSequence')
    expect(transaction.get).toHaveBeenCalledWith({ id: 'orderSequence' })
    expect(transaction.set).toHaveBeenNthCalledWith(1, { id: 'orderSequence' }, {
      lastNumber: lastNumber + 1,
      lastOrderId: 'orden-interna',
    })
    expect(transaction.set).toHaveBeenNthCalledWith(2, { id: 'orden-interna' }, {
      userId: 'usuario-1',
      userEmail: 'ana@example.com',
      buyer,
      items: [{ id: 'remiendo-1', name: 'Remiendo visible denim', price: 8500, quantity: 2 }],
      total: 17000,
      orderNumber: lastNumber + 1,
      createdAt: 'server-time',
    })
    expect(serverTimestamp).toHaveBeenCalledOnce()
  })
})
