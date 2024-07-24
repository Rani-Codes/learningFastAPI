"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from  '@/app/(auth)/utils/fetchAPI'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<String | null>(null)
    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await login(username, password)
            router.push('/tasks')
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                console.error("Caught an error that is not an instance of Error:", error)
            }
        }
    }

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    )
}

export default Login