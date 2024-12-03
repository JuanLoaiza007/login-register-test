import MainContent from '@/app/admin/_components/MainContent'
import ProductItem from '@/app/admin/products/_components/ProductItem'
import { loadProducts } from '@/app/_api/stock'

export default async function AdminProductsPage() {
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
      <MainContent items={items} ItemComponent={ProductItem} />
    </>
  )
}
