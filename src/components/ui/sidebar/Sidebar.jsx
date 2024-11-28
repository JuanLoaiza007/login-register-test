'use client'
import { usePathname } from 'next/navigation'
import { useSidebarState } from '@/states/SidebarState'
import CategoriesList from '@/components/ui/sidebar/CategoriesList'

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebarState()

  return (
    <div>
      {isOpen && pathname === '/' && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex'>
          <div className='relative w-64 bg-gray-900 text-white py-24 px-6 shadow-md'>
            <CategoriesList />
          </div>
        </div>
      )}
    </div>
  )
}
