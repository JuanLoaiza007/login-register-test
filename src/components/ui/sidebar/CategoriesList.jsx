// src/components/categories/CategoriesList.jsx
'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/hooks/useFilters'
import { useSidebarState } from '@/states/SidebarState'
import { loadCategories } from '@/libs/api/categoriesApi'

export default function CategoriesList() {
  const { filters, setFilters } = useFilters()
  const { isOpen, setIsOpen } = useSidebarState()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories().then((categories) => {
      setCategories(categories)
    })
  }, [])

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category
    }))
    setIsOpen(false)
  }

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer ${
              filters.category === category.title ? 'font-bold' : ''
            }`}
            onClick={() => handleCategoryChange(category.title)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
