import { afterEach, describe, expect, it, vi } from 'vitest'
import { products } from '../mock/asyncMock.js'
import { getProductById } from './getProductById.js'

describe('getProductById', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('devuelve el producto que coincide con el identificador recibido', async () => {
    vi.useFakeTimers()
    const requestedProduct = products[1]
    const productPromise = getProductById(requestedProduct.id)

    await vi.runAllTimersAsync()

    await expect(productPromise).resolves.toEqual(requestedProduct)
  })

  it('devuelve productos diferentes cuando recibe identificadores diferentes', async () => {
    vi.useFakeTimers()
    const firstProductPromise = getProductById(products[0].id)
    const secondProductPromise = getProductById(products[2].id)

    await vi.runAllTimersAsync()

    await expect(firstProductPromise).resolves.toEqual(products[0])
    await expect(secondProductPromise).resolves.toEqual(products[2])
  })

  it('rechaza la promesa cuando el identificador no existe', async () => {
    vi.useFakeTimers()
    const productPromise = getProductById('producto-inexistente')

    const expectation = expect(productPromise).rejects.toThrow('Producto no encontrado')
    await vi.runAllTimersAsync()

    await expectation
  })
})
