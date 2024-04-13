import API_URL from './API';
import { ApiError } from './helpers';

// Fetch all users
export const homePageLoader = async () => {
  const res = await fetch(`${API_URL}/users`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const error = new ApiError('Server Error', 500);
    throw error;
  }
  const allPlayers = await res.json();
  return allPlayers;
};
