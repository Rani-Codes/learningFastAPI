'use client'
import withAuth from "@/components/withAuth"

const page = () => {
  return (
    <div>This is a protected page, if you see this then you have passed!</div>
  )
}

export default withAuth(page)