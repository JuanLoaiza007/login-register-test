import MainContent from '@/app/admin/_components/MainContent'
import CategoryItem from '@/app/admin/categories/_components/CategoryItem'
import { loadCategories } from '@/app/_api/stock'

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
