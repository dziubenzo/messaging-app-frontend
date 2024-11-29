import type { Params } from 'react-router-dom';
import { defer } from 'react-router-dom';
import API_URL from './API';
import type { Message, User } from './types';

// Get user if they are authenticated
// Otherwise redirect to the Log In page
export async function userLoader() {
  const res = fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());
  return defer({ userPromise: res as Promise<User> });
}

// Fetch data for the Home page (user and all users)
export async function homePageLoader() {
  const userRes = fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  const allUsersRes = fetch(`${API_URL}/users`, {
    credentials: 'include',
  }).then((res) => res.json());

  return defer({
    userPromise: userRes as Promise<User>,
    allUsersPromise: allUsersRes as Promise<User[]>,
  });
}

// Fetch data for the Chat page (user, recipient and then messages)
export async function chatPageLoader({ params }: { params: Params<'userId'> }) {
  const recipientId = params.userId;

  const userRes = fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  const recipientRes = fetch(`${API_URL}/users/${recipientId}`, {
    credentials: 'include',
  }).then((res) => res.json());

  const messagesRes = Promise.all([userRes, recipientRes]).then(
    ([user, recipient]: [User, User]) =>
      fetch(`${API_URL}/messages/?from=${user._id}&to=${recipient._id}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  );

  return defer({
    userPromise: userRes as Promise<User>,
    recipientPromise: recipientRes as Promise<User>,
    messagesPromise: messagesRes as Promise<Message[]>,
  });
}
