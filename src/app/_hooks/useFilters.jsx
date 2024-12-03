'use client'
import { useContext } from 'react'
import { FiltersContext } from '@/app/_contexts/filters'

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.title
          .toLowerCase()
          .includes(filters.includedString.toLowerCase()) &&
        (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  return { filters, setFilters, filterProducts }
}
