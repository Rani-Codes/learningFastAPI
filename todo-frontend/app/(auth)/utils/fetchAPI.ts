// This is a utility file to help fetch API requests. This will help manage headers, tokens, and error handling 

//Had to use cookies and localStorage because I want this to be a server and client component
// to allow for me to have a dynamic navbar that is pre-rendered as well as to check tasks and 
// display them accurately on the client side.

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Client-side fetch API
export async function fetchAPIClient(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
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


export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username,
      password,
    }),
  });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Something went wrong');
    }
  
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/;`
    return data;
  }
