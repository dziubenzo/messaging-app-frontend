import {
  createContext,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
} from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { GroupChat, Message, User } from '../types';

type SuspenseWrapperProps = {
  fallback: ReactElement;
  children: ReactNode;
  isHomePage?: boolean;
  isChatPage?: boolean;
  isGroupChatPage?: boolean;
};

type UserContextType = {
  user: User;
  allUsers?: User[];
  recipient?: User;
  messages?: Message[];
  groupChat?: GroupChat;
};

type LoaderData = {
  userPromise: Promise<User>;
  allUsersPromise: Promise<User[]>;
  recipientPromise: Promise<User>;
  messagesPromise: Promise<Message[]>;
  groupChatPromise: Promise<GroupChat>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function SuspenseWrapper({
  fallback,
  children,
  isHomePage,
  isChatPage,
  isGroupChatPage,
}: SuspenseWrapperProps) {
  const {
    userPromise,
    allUsersPromise,
    recipientPromise,
    messagesPromise,
    groupChatPromise,
  } = useLoaderData() as LoaderData;

  const homePagePromises = useMemo(
    () => Promise.all([userPromise, allUsersPromise]),
    [userPromise, allUsersPromise],
  );

  const chatPagePromises = useMemo(
    () => Promise.all([userPromise, recipientPromise, messagesPromise]),
    [userPromise, recipientPromise, messagesPromise],
  );

  const groupChatPagePromises = useMemo(
    () => Promise.all([userPromise, groupChatPromise]),
    [userPromise, groupChatPromise],
  );

  if (isHomePage) {
    return (
      <Suspense fallback={fallback}>
        <Await
          resolve={homePagePromises}
          errorElement={<Navigate to="/login" />}
        >
          {([user, allUsers]: [User, User[]]) => {
            return (
              <UserContext.Provider value={{ user, allUsers }}>
                {children}
              </UserContext.Provider>
            );
          }}
        </Await>
      </Suspense>
    );
  }

  if (isChatPage) {
    return (
      <Suspense fallback={fallback}>
        <Await
          resolve={chatPagePromises}
          errorElement={<Navigate to="/login" />}
        >
          {([user, recipient, messages]: [User, User, Message[]]) => {
            return (
              <UserContext.Provider value={{ user, recipient, messages }}>
                {children}
              </UserContext.Provider>
            );
          }}
        </Await>
      </Suspense>
    );
  }

  if (isGroupChatPage) {
    return (
      <Suspense fallback={fallback}>
        <Await
          resolve={groupChatPagePromises}
          errorElement={<Navigate to="/login" />}
        >
          {([user, groupChat]: [User, GroupChat]) => {
            return (
              <UserContext.Provider value={{ user, groupChat }}>
                {children}
              </UserContext.Provider>
            );
          }}
        </Await>
      </Suspense>
    );
  }
}
