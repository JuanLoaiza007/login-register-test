import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'

const loadCategories = async () => {
  const module = await import('@/../public/mocks/categories.json')
  return module.categories
}

export default async function AdminCategoriesPage() {
  const categories = await loadCategories()
  const items = categories.map((category) => ({
    key: category.id,
    title: category.title,
    name: category.name,
    description: category.description
  }))

  return (
    <>
      <MainContent items={items} ItemComponent={CategoryItem} />
    </>
  )
}
