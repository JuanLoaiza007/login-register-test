export const loadCategories = async () => {
  const module = await import('@/../public/mocks/categories.json')
  return module.categories
}
