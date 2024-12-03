export const loadProducts = async () => {
  const module = await import('@/../public/mocks/products.json')
  return module.products
}

export const loadProductById = async (id) => {
  const products = await loadProducts()
  const productId = Number(id)
  return products.find((product) => product.id === productId)
}
