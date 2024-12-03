import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'
import { loadBrands } from '@/app/_api/stock'

export default async function AdminBrandsPage() {
  const brands = await loadBrands()
  const items = brands.map((brand) => ({
    key: brand.id,
    name: brand.name,
    description: brand.description
  }))

  return (
    <>
      <MainContent items={items} ItemComponent={BrandItem} />
    </>
  )
}
