"use client";

import { useEffect, useState } from 'react';
import { fetchAPIClient } from '@/app/(auth)/utils/fetchAPI';
import TaskLayout from '@/components/TaskLayout';
import EmptyTaskLayout from '@/components/EmptyTaskLayout';

interface Task {
  title: string;
  description: string;
  id: number;
  completed: boolean;
  owner_id: number;
  count: number,
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetchAPIClient('/tasks');
        setTasks(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p className='flex justify-center items-center w-full h-screen text-xl'>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let count:number = 0

  return (
    <div className="flex w-full justify-center my-10 p-4">
        <div className={`${tasks.length? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-20" : "grid grid-cols-1"}`}>
        {tasks.map((task) => {
          count += 1; // increment count for each task
          return (
            <div key={task.id}>
              <TaskLayout title={task.title} description={task.description} completed={task.completed} id={task.id} count={count} />
            </div>
          );
        })}
        <EmptyTaskLayout />
      </div>
    </div>
  );
};

export default TasksPage
