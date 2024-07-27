import React from "react";

interface Task {
    title: string;
    description?: string
    id: number;
    completed: boolean;
  }

export default function TaskLayout(task: Task) {
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
            <h1 className="text-white text-sm px-2">{task.id}</h1>
            <button className="px-2 py-1 rounded-lg bg-[#3da9fc] text-white font-semibold">
                Update
            </button>
            <h3 className={`text-white p-4 rounded-full ${task.completed ? `bg-green-400` : `bg-red-400`}`} />
        </div>
        
        </div>
    </div>
  );
}

const updateMenu = () => {
    
}