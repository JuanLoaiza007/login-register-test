import MainContent from '@/app/admin/_components/MainContent'
import AuxiliaryItem from '@/app/admin/auxiliaries/_components/AuxiliaryItem'

const loadAuxiliaries = async () => {
  const module = await import('@/../public/mocks/auxiliaries.json')
  return module.auxiliaries
}

export default async function AdminArticlesPage() {
  const auxiliaries = await loadAuxiliaries()
  const items = auxiliaries.map((auxiliary) => ({
    key: auxiliary.key,
    firstName: auxiliary.first_name,
    lastName: auxiliary.last_name,
    email: auxiliary.email
  }))

  return (
    <>
      <MainContent items={items} ItemComponent={AuxiliaryItem} />
    </>
  )
}
