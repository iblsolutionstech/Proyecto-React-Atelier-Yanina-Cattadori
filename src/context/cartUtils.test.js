import { describe, expect, it } from 'vitest'
import { products } from '../mock/asyncMock.js'
import { addCartItem, getCartTotalItems, getCartTotalPrice, removeCartItem } from './cartUtils.js'

describe('cartUtils', () => {
  const product = products[0]

  it('suma un producto al carrito sin modificar el producto original', () => {
    const cart = addCartItem([], product, 2)

    expect(cart).toHaveLength(1)
    expect(cart[0]).toMatchObject({ id: product.id, quantity: 2 })
    expect(product).not.toHaveProperty('quantity')
  })

  it('acumula la cantidad sin superar el stock', () => {
    const initialCart = addCartItem([], product, product.stock - 1)
    const cart = addCartItem(initialCart, product, 3)

    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(product.stock)
  })

  it('calcula el total y elimina una seleccion', () => {
    const cart = addCartItem([], product, 2)

    expect(getCartTotalItems(cart)).toBe(2)
    expect(getCartTotalPrice(cart)).toBe(product.price * 2)
    expect(removeCartItem(cart, product.id)).toEqual([])
  })
})
