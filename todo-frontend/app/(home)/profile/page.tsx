"use client";

import { useEffect, useState } from 'react';
import { fetchAPIClient } from '@/app/(auth)/utils/fetchAPI';
import { FlipWords } from '@/components/ui/flip-words';
import router, { useRouter } from 'next/navigation';
import { deleteUser } from '@/app/(auth)/utils/authAPI';

interface User {
  id: number;
  username: string;
  hashed_password: string;
}


const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchAPIClient('/users/me/', {method: 'GET'});
        setUser(data)
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

    fetchUser();
  }, []);


  const handleDelete = async() => {
    setError(null)
  
    try{
      await deleteUser(user?.id)
      router.push('/')
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        console.error("Caught an error that is not an instance of Error:", error);
      }
    }
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className='text-center w-full my-8'>
      <div key={user.id} className='py-4 text-center'>
        <h2 className='text-2xl sm:text-4xl'> Hi 
          <FlipWords 
              words={[`${user.username}`, ""]} 
              className='text-2xl sm:text-4xl font-bold'
              /> 
          nice to have you here!</h2>
        <div className='text-2xl sm:text-4xl my-20'>
          <h4>
              Thank you for making an account with us!
            </h4>
            <h4>You are user number: <strong>{user.id}</strong>
          </h4>
        </div>
      </div>
      <div>
        <h2 className='text-lg my-2  sm:text-2xl sm:my-6'>Want to delete your account?</h2>
        <button onClick={handleDelete} className='font-bold text-white text-base p-3 sm:text-xl border bg-slate-700 sm:p-4 rounded-3xl'>Delete account</button>
      </div>
    </div>
  );
};

export default UserPage
