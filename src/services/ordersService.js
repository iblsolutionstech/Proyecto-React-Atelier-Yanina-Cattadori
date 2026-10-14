import { collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export async function createOrder({ user, buyer, cart, total }) {
  const sequenceRef = doc(db, 'metadata', 'orderSequence')
  const orderRef = doc(collection(db, 'orders'))
  const items = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }))

  return runTransaction(db, async (transaction) => {
    const sequence = await transaction.get(sequenceRef)
    const lastNumber = sequence.exists() ? sequence.data().lastNumber : 0

    if (!Number.isSafeInteger(lastNumber) || lastNumber < 0) {
      throw new Error('La numeración de pedidos no es válida.')
    }

    const orderNumber = lastNumber + 1

    transaction.set(sequenceRef, {
      lastNumber: orderNumber,
      lastOrderId: orderRef.id,
    })
    transaction.set(orderRef, {
      userId: user.uid,
      userEmail: user.email,
      buyer,
      items,
      total,
      orderNumber,
      createdAt: serverTimestamp(),
    })

    return { id: orderRef.id, number: String(orderNumber).padStart(6, '0') }
  })
}
