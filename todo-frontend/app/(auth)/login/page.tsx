"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../utils/authAPI'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link";

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
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {error && <p className='text-red-600'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <button className="w-full">Sign In</button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline ml-2" href={"/signup"}>
              Signup
            </Link>
          </div>
        </form>
      </div>
    )
}

export default Login