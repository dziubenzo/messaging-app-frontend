import { createContext, ReactElement, ReactNode, Suspense } from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { User } from '../types';

type SuspenseWrapperProps = {
  fallback: ReactElement;
  children: ReactNode;
};

type UserContextType = {
  user: User;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function SuspenseWrapper({
  fallback,
  children,
}: SuspenseWrapperProps) {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<User>;
  };

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
