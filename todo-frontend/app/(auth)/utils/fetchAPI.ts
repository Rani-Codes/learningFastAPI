// This is a utility file to help fetch API requests. This will help manage headers, tokens, and error handling
// Purpose: Act as a generic fetch request which can be expanded upon.

//Had to use cookies and localStorage because I want this to be a server and client component
// to allow for me to have a dynamic navbar that is pre-rendered as well as to check tasks and 
// display them accurately on the client side.

import Cookies from 'js-cookie';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Client-side fetch API
export async function fetchAPIClient(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Something went wrong');
  }

  return response.json();
}

// Server-side fetch API
export async function fetchAPIServer(endpoint: string, token: string | undefined, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Something went wrong');
  }

  return response.json();
}
