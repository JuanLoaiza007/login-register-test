'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { isAuthenticated } from './handleAuthentication'

export default function withAuth(Component) {
  return function WithAuth(props) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (!isAuthenticated()) {
        redirect('/')
      } else {
        setIsLoading(false)
      }
    }, [])

    if (isLoading) {
      return null
    }

    return <Component {...props} />
  }
}
