import Cookies from 'js-cookie';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTask(title: string, description: string){
    const token = Cookies.get('token');  // Fetch the token from cookies

    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}), //Tells backend we are logged in and can access this endpoint
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

export async function updateTask(title: string, description: string, id: number, completed: boolean){
    const token = Cookies.get('token'); 

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
            title,
            description,
            completed,
        })
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
    
      const data = await response.json();
      return data;
}



export async function deleteTask(id: number){
    const token = Cookies.get('token'); 

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
    
      return await response.json();
}