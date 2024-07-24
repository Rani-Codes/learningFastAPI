"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/app/(auth)/utils/apiCalls'

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await getCurrentUser()
          setLoading(false)
        } catch (error) {
          router.push('/login')
        }
      };
      checkAuth()
    }, [router])

    if (loading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
