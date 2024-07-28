import Cookies from 'js-cookie';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTask(title: string, description: string){
    const token = Cookies.get('token');  // Fetch the token from cookies

    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
            title,
            description,
        })
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
    
      const data = await response.json();
      return data;
}