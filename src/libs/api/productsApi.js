export const loadProducts = async () => {
  const module = await import('@/../public/mocks/products.json')
  return module.products
}
