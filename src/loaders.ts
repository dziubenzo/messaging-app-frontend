import type { Params } from 'react-router-dom';
import { defer } from 'react-router-dom';
import API_URL from './API';
import { ApiError, buildHeader } from './helpers';
import type { GroupChat, Message, User } from './types';

// Fetch data for the Home page (user, all users and user's group chats)
export async function homePageLoader() {
  const userRes = fetch(`${API_URL}/users/auth`, buildHeader('POST')).then(
    (res) => {
      if (!res.ok) throw new ApiError('You are not logged in', 401);
      return res.json();
    },
  );

  const allUsersRes = fetch(`${API_URL}/users`, buildHeader('GET')).then(
    (res) => res.json(),
  );

  const groupChatsRes = userRes.then((user) =>
    fetch(
      `${API_URL}/group-chats/?member=${user._id}`,
      buildHeader('GET'),
    ).then((res) => res.json()),
  );

  return defer({
    userPromise: userRes as Promise<User>,
    allUsersPromise: allUsersRes as Promise<User[]>,
    groupChatsPromise: groupChatsRes as Promise<GroupChat[]>,
  });
}

// Fetch data for the Chat page (user, recipient and then messages)
export async function chatPageLoader({ params }: { params: Params<'userId'> }) {
  const recipientId = params.userId;

  if (!recipientId) return;

  // Make sure the path parameter is an integer in the allowed range
  if (
    Number.isNaN(parseInt(recipientId)) ||
    parseInt(recipientId) < 1000000 ||
    parseInt(recipientId) > 9999999
  ) {
    throw new ApiError('Invalid user id', 500);
  }

  const userRes = fetch(`${API_URL}/users/auth`, buildHeader('POST')).then(
    (res) => {
      if (!res.ok) throw new ApiError('You are not logged in', 401);
      return res.json();
    },
  );

  const recipientRes = fetch(
    `${API_URL}/users/${recipientId}`,
    buildHeader('GET'),
  ).then((res) => res.json());

  const messagesRes = Promise.all([userRes, recipientRes]).then(
    ([user, recipient]: [User, User]) =>
      fetch(
        `${API_URL}/messages/?from=${user._id}&to=${recipient._id}`,
        buildHeader('GET'),
      ).then((res) => res.json()),
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

  const userRes = fetch(`${API_URL}/users/auth`, buildHeader('POST')).then(
    (res) => {
      if (!res.ok) throw new ApiError('You are not logged in', 401);
      return res.json();
    },
  );

  const groupChatRes = fetch(
    `${API_URL}/group-chats/${groupChatName}`,
    buildHeader('GET'),
  ).then((res) => res.json());

  return defer({
    userPromise: userRes as Promise<User>,
    groupChatPromise: groupChatRes as Promise<GroupChat>,
  });
}
