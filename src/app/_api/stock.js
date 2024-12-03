import { api } from '@/app/_utils/api'

export const createBrand = async (data, token) => {
  const response = await api.post('/stock/brand/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const createCategory = async (data, token) => {
  const response = await api.post('/stock/category/create', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const addProduct = async (data, token) => {
  const response = await api.post('/stock/product/add', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const listBrands = async (token) => {
  const response = await api.get('/stock/brand/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const listCategories = async (token) => {
  const response = await api.get('/stock/category/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const loadCategories = async () => {
  const module = await import('@/../public/mocks/categories.json')
  return module.categories
}

export const listProducts = async (token) => {
  const response = await api.get('/stock/product/list', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const loadProducts = async () => {
  const module = await import('@/../public/mocks/products.json')
  return module.products
}

export const loadProductById = async (id) => {
  const products = await loadProducts()
  const productId = Number(id)
  return products.find((product) => product.id === productId)
}

export const supplyProduct = async (data, token) => {
  const response = await api.post('/stock/product/supply', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}
