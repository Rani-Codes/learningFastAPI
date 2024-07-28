'use client'
import { useState } from "react"
import { signup } from "../utils/authAPI"


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


const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<String | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      try {
        await signup(username, password)
        setSuccess("User successfully created")
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
      {success && !error && <p className='text-blue-600'>{success}</p>}
      {error && !success && <p className='text-red-600'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full">Sign Up</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup