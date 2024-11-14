'use client'
import { useFilters } from '@/hooks/useFilters'
import { useSidebarState } from '@/states/SidebarState'
import categoriesData from '../../public/mocks/categories.json'

export default function Sidebar() {
  const { filters, setFilters } = useFilters()
  const { isOpen, setIsOpen } = useSidebarState()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category
    }))
  }

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex'>
          <div className='relative w-64 bg-gray-900 text-white py-24 px-6 shadow-md'>
            <button
              onClick={toggleSidebar}
              className='absolute top-2 right-2 text-gray-300 text-2xl hover:text-red-500'
            >
              &times;
            </button>
            <h2 className='text-lg font-bold mb-4'>Categorías</h2>
            <ul>
              {categoriesData.categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer ${
                    filters.category === category.title ? 'font-bold' : ''
                  }`}
                  onClick={() => {
                    handleCategoryChange(category.title)
                    toggleSidebar()
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
