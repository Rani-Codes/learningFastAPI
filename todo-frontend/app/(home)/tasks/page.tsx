"use client";

import { useEffect, useState } from 'react';
import { fetchAPIClient } from '@/app/(auth)/utils/fetchAPI';

interface Task {
  title: string;
  description: string;
  id: number;
  completed: boolean;
  owner_id: number;
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='text-center w-full my-8'>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <div key={task.id} className='py-4'>
            <h2>Title: {task.title}</h2>
            <p>Description: {task.description}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage
