import { redirect } from 'react-router-dom';
import API_URL from './API';
import type { User } from './types';

// Get user if they are authenticated
// Otherwise redirect to the Log In page
export async function userLoader(): Promise<User | Response> {
  const res = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) {
    return redirect('/login');
  }
  const user = await res.json();
  return user;
}
