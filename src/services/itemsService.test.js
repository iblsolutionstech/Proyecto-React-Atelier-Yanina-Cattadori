import { beforeEach, describe, expect, it, vi } from 'vitest'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { getItemById, getItems } from './itemsService.js'

vi.mock('../firebase/config', () => ({ db: { id: 'test-db' } }))
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'items-collection'),
  doc: vi.fn(() => 'item-reference'),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(() => 'category-query'),
  where: vi.fn(() => 'category-filter'),
}))

const itemData = {
  Nombre: 'Remiendo visible denim',
  Precio: 8500,
  Categoria: 'Arreglos',
  IdCategoria: 'arreglos',
  Imagen: '/products/remiendo-denim.jpg',
  Stock: 8,
  Descripcion: 'Intervención artesanal',
  Detalle: 'Terminación visible',
  TiempoEstimado: '3 a 5 días',
}

const itemDocument = {
  id: 'remiendo-1',
  exists: () => true,
  data: () => itemData,
}

describe('consultas de items en Firestore', () => {
  beforeEach(() => vi.clearAllMocks())

  it('transforma documentos y consulta la colección completa', async () => {
    getDocs.mockResolvedValue({ docs: [itemDocument] })

    await expect(getItems()).resolves.toEqual([{
      id: 'remiendo-1',
      name: itemData.Nombre,
      price: itemData.Precio,
      category: itemData.Categoria,
      categoryId: itemData.IdCategoria,
      image: itemData.Imagen,
      img: itemData.Imagen,
      stock: itemData.Stock,
      description: itemData.Descripcion,
      details: itemData.Detalle,
      estimatedTime: itemData.TiempoEstimado,
    }])
    expect(collection).toHaveBeenCalledWith(expect.anything(), 'items')
    expect(getDocs).toHaveBeenCalledWith('items-collection')
  })

  it('filtra por IdCategoria', async () => {
    getDocs.mockResolvedValue({ docs: [] })

    await getItems('arreglos')

    expect(where).toHaveBeenCalledWith('IdCategoria', '==', 'arreglos')
    expect(query).toHaveBeenCalledWith('items-collection', 'category-filter')
    expect(getDocs).toHaveBeenCalledWith('category-query')
  })

  it('busca por ID de documento y señala un producto inexistente', async () => {
    getDoc.mockResolvedValueOnce(itemDocument).mockResolvedValueOnce({ exists: () => false })

    await expect(getItemById('remiendo-1')).resolves.toMatchObject({ id: 'remiendo-1' })
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'items', 'remiendo-1')
    await expect(getItemById('inexistente')).rejects.toThrow('No se encontró el producto solicitado.')
  })
})
