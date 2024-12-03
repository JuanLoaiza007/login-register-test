import MainContent from '@/app/admin/_components/MainContent'
import ArticleItem from '@/app/admin/articles/_components/ArticleItem'

const loadProducts = async () => {
  const module = await import('@/../public/mocks/products.json')
  return module.products
}

export default async function AdminArticlesPage() {
  const products = await loadProducts()
  const items = products.map((product) => ({
    key: product.id,
    name: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    stock: product.stock
  }))

  return (
    <>
      <MainContent items={items} ItemComponent={ArticleItem} />
    </>
  )
}
