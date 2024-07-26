"use client";

import { useEffect, useState } from 'react';
import { fetchAPIClient } from '@/app/(auth)/utils/fetchAPI';

interface User {
  id: number;
  username: string;
  hashed_password: string;
}


const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      <h1>Your Profile</h1>
      <div key={user.id} className='py-4'>
        <h2>Username: {user.username}</h2>
        <p>User ID: {user.id}</p>
      </div>
    </div>
  );
};

export default UserPage
