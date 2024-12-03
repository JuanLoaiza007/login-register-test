'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function withAuth(Component) {
  const session = true

  return function WithAuth(props) {
    useEffect(() => {
      if (!session) {
        redirect('/')
      }
    }, [])

    if (!session) {
      return null
    }

    return <Component {...props} />
  }
}
