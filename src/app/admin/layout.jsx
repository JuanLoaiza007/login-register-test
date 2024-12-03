import AdminSidebar from '@/app/admin/_components/AdminSidebar'
import MainContent from '@/app/admin/_components/MainContent'

export default function AdminLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <AdminSidebar />
      <div className='flex flex-col flex-1'>{children}</div>
    </div>
  )
}
