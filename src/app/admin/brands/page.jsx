import MainContent from '@/app/admin/_components/MainContent'
import BrandItem from '@/app/admin/brands/_components/BrandItem'

const loadBrands = async () => {
  const module = await import('@/../public/mocks/brands.json')
  return module.brands
}

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
