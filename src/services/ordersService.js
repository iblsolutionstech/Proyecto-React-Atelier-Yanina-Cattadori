import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export async function createOrder({ user, buyer, cart, total }) {
  const items = cart.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }))

  return addDoc(collection(db, 'orders'), {
    userId: user.uid,
    userEmail: user.email,
    buyer,
    items,
    total,
    createdAt: serverTimestamp(),
  })
}