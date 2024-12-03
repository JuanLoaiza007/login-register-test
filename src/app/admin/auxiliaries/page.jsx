import MainContent from '@/app/admin/_components/MainContent'
import AuxiliaryItem from '@/app/admin/auxiliaries/_components/AuxiliaryItem'
import { loadAuxiliaries } from '@/app/_api/auth'

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
