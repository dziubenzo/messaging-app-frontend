import {
  createContext,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
} from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import { User } from '../types';

type SuspenseWrapperProps = {
  fallback: ReactElement;
  children: ReactNode;
  isHomePage?: boolean;
};

type UserContextType = {
  user: User;
  allUsers?: User[];
};

export const UserContext = createContext<UserContextType | null>(null);

export default function SuspenseWrapper({
  fallback,
  children,
  isHomePage,
}: SuspenseWrapperProps) {
  const { userPromise, allUsersPromise } = useLoaderData() as {
    userPromise: Promise<User>;
    allUsersPromise: Promise<User[]>;
  };

  const homePagePromises = useMemo(
    () => Promise.all([userPromise, allUsersPromise]),
    [userPromise, allUsersPromise],
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
  } else {
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
}
