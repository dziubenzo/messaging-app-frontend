import type { Params } from 'react-router-dom';
import { defer } from 'react-router-dom';
import API_URL from './API';
import type { GroupChat, Message, User } from './types';

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

// Fetch data for the Group Chat page (user and group chat populated with messages and members)
export async function groupChatPageLoader({
  params,
}: {
  params: Params<'groupChatName'>;
}) {
  const groupChatName = params.groupChatName;

  const userRes = fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json());

  const groupChatRes = fetch(`${API_URL}/group-chats/${groupChatName}`, {
    credentials: 'include',
  }).then((res) => res.json());

  return defer({
    userPromise: userRes as Promise<User>,
    groupChatPromise: groupChatRes as Promise<GroupChat>,
  });
}
