'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/hooks/useFilters'
import { useSidebarState } from '@/states/SidebarState'
import { loadCategories } from '@/libs/api/categoriesApi'
import {
  CATEGORY_ID,
  CATEGORY_NAME,
  CATEGORY_TITLE
} from '@/libs/api/Constants.js'

export default function CategoriesList() {
  const { filters, setFilters } = useFilters()
  const { setIsOpen } = useSidebarState()
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
            key={category[CATEGORY_ID]}
            className={`cursor-pointer ${
              filters.category === category[CATEGORY_TITLE] ? 'font-bold' : ''
            }`}
            onClick={() => handleCategoryChange(category[CATEGORY_TITLE])}
          >
            {category[CATEGORY_NAME]}
          </li>
        ))}
      </ul>
    </div>
  )
}
