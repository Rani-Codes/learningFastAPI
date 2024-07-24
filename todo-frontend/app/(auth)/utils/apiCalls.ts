// services/auth.ts
import { fetchAPI } from "./fetchAPI";

export async function login(username: string, password: string) {
  const response = await fetchAPI('/auth/token', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  localStorage.setItem('token', response.access_token);
  return response;
}

export async function getCurrentUser() {
  return fetchAPI('/users/me');
}
