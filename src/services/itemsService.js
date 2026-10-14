import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

function mapItem(document) {
  const data = document.data()

  return {
    id: document.id,
    name: data.Nombre,
    price: data.Precio,
    category: data.Categoria,
    categoryId: data.IdCategoria,
    image: data.Imagen,
    img: data.Imagen,
    stock: data.Stock,
    description: data.Descripcion,
    details: data.Detalle,
    estimatedTime: data.TiempoEstimado,
  }
}

export async function getItems(categoryId) {
  const itemsCollection = collection(db, 'items')

  const itemsQuery = categoryId
    ? query(itemsCollection, where('IdCategoria', '==', categoryId))
    : itemsCollection

  const snapshot = await getDocs(itemsQuery)

  return snapshot.docs.map(mapItem)
}

export async function getItemById(itemId) {
  const itemReference = doc(db, 'items', itemId)
  const snapshot = await getDoc(itemReference)

  if (!snapshot.exists()) {
    throw new Error('No se encontró el producto solicitado.')
  }

  return mapItem(snapshot)
}