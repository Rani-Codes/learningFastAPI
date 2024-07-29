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
import { useState } from "react";
import { deleteTask, updateTask } from "@/app/(auth)/utils/fetchTasks";

interface Task {
    title: string;
    description?: string
    id: number;
    completed: boolean;
    count: number
  }

export default function TaskLayout(task: Task) {

  const [title, setTitle] = useState(task.title || '')
  const [description, setDescription] = useState(task.description || '')
  const [completed, setCompleted] = useState(task.completed || false)
  const [error, setError] = useState<String | null>(null)

  
  const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      try {
        await updateTask(title, description, task.id, completed)
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

  const handleDelete = async () => {
    setError(null)

    try {
      await deleteTask(task.id)
      window.location.reload()
    } 
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        console.error("Caught an error that is not an instance of Error:", error);
      }
    }
  }


  return (
    <div className=" w-full relative max-w-xs h-full">
    {/* Line below is for bg gradient effect */}
    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-[#094067] border border-gray-800  px-4 py-4 h-full overflow-hidden rounded-2xl flex flex-col justify-between items-start">

        <div>
          <h1 className="font-bold text-xl text-white mb-2 z-50">
            {task.title}
          </h1>

          {/* Conditionally render description or a placeholder */}
          {task.description ? (
            <p className="font-normal text-base text-slate-200 mb-4 z-50 max-h-24 overflow-y-auto">
              {task.description}
            </p>
          ) : (
            <p className="mb-4 z-50 invisible">Placeholder</p>
          )}
        </div>

        <div className="flex justify-between w-full items-center">
            <h1 className="text-white text-sm px-2">{task.count}</h1>

            <Dialog>
              <DialogTrigger asChild>
              <button className="px-2 py-1 rounded-lg bg-[#3da9fc] text-white font-semibold">
                Update
              </button>
              </DialogTrigger>

              <DialogContent>
                  <DialogHeader>
                  {error && <p className='text-red-600'>{error}</p>}
                      <DialogTitle>Update your task</DialogTitle>
                      <DialogDescription>
                          <p>You can update any field you want or delete the task altogether.</p>
                      </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdate}>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right"> Title </Label>
                          <Input
                          id="title"
                          type="text"
                          className="col-span-3"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right"> Description </Label>
                          <textarea
                            id="description"
                            className="col-span-3 p-2 border border-gray-300 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                      </div>

                      <div className="flex items-center gap-4 w-full">
                        <Label htmlFor="completed" className="text-right">Task Completed</Label>
                        <Input
                        id="completed"
                        type="checkbox"
                        className="max-w-6 max-h-6"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        />
                      </div>
                  </div>
                  <DialogFooter>
                    <div className="flex flex-row-reverse justify-between w-full mt-8">
                      <button type="submit" className="px-2 py-1 rounded-lg bg-[#3da9fc] text-white">Update</button>
                      <button onClick={handleDelete} className="w-fit bg-red-500 text-white py-1 px-2 rounded">Delete task</button>
                    </div>
                  </DialogFooter>
                  </form>
              </DialogContent>
              </Dialog>

            <h3 className={`text-white p-4 rounded-full ${task.completed ? `bg-green-400` : `bg-red-400`}`} />
        </div>
        
        </div>
    </div>
  );
}
