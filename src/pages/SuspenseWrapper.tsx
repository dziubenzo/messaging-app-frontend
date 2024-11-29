import {
  createContext,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
} from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { Message, User } from '../types';

type SuspenseWrapperProps = {
  fallback: ReactElement;
  children: ReactNode;
  isHomePage?: boolean;
  isChatPage?: boolean;
};

type UserContextType = {
  user: User;
  allUsers?: User[];
  recipient?: User;
  messages?: Message[];
};

type LoaderData = {
  userPromise: Promise<User>;
  allUsersPromise: Promise<User[]>;
  recipientPromise: Promise<User>;
  messagesPromise: Promise<Message[]>;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function SuspenseWrapper({
  fallback,
  children,
  isHomePage,
  isChatPage,
}: SuspenseWrapperProps) {
  const { userPromise, allUsersPromise, recipientPromise, messagesPromise } =
    useLoaderData() as LoaderData;

  const homePagePromises = useMemo(
    () => Promise.all([userPromise, allUsersPromise]),
    [userPromise, allUsersPromise],
  );

  const chatPagePromises = useMemo(
    () => Promise.all([userPromise, recipientPromise, messagesPromise]),
    [userPromise, recipientPromise, messagesPromise],
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

  return (
    <Suspense fallback={fallback}>
      <Await resolve={userPromise} errorElement={<Navigate to="/login" />}>
        {(resolvedPromise: User) => {
          return (
            <UserContext.Provider value={{ user: resolvedPromise }}>
              {children}
            </UserContext.Provider>
          );
        }}
      </Await>
    </Suspense>
  );
}
