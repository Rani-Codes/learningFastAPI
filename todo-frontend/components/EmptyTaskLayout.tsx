'use client'
import { useState } from "react"
import { createTask } from "@/app/(auth)/utils/fetchTasks";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Label } from "./ui/label";



export default function EmptyTaskLayout() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<String | null>(null)
  
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
          await createTask(title, description)
          window.location.reload() // Refresh the page after successful task creation
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
    <div className=" w-full relative max-w-xs h-full">
        <div className="relative shadow-xl border bg-neutral-100 border-gray-800  px-4 py-4 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start">
            <div className="w-full text-center">
            <h1 className="font-bold underline text-xl text-[#094067] mb-2 z-50">
                Add a new task!
            </h1>

            </div>
            <div className="flex justify-center h-full w-full items-center mt-8 md:mt-0">
                <Dialog>
                    <DialogTrigger asChild>
                    <button className="px-2 py-1 rounded-lg bg-[#094067] text-white font-semibold">
                        Create task
                    </button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                        {error && <p className='text-red-600'>{error}</p>}
                            <DialogTitle>Create a new task</DialogTitle>
                            <DialogDescription>
                                Fill out the fields and then hit create task when finished.
                                <p>Please note: A title is required, but a description is not.</p>
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right"> Title </Label>
                                <Input
                                id="title"
                                type="text"
                                placeholder="title"
                                className="col-span-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right"> Description </Label>
                                <Input
                                id="description"
                                type="text"
                                defaultValue=""
                                className="col-span-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <button type="submit" className="hover:text-gray-500">Create task</button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>
  );
}