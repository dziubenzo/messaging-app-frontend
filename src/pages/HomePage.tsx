import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import BottomBar from '../components/BottomBar';
import ContactsBar from '../components/ContactsBar';
import Error from '../components/Error';
import Loading from '../components/Loading';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import {
  sortByStatusIcon,
  useChangeStatusIcon,
  useChangeToAvailable,
  useFetch,
  useUser,
} from '../helpers';
import { useEventsHomePage } from '../socket';
import { MiddleSection, StyledHomePage } from '../styles/HomePage.styled';
import type { BottomBar as BottomBarType, OutletContext, User } from '../types';

export default function HomePage() {
  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();
  const { user: fetchedUser } = useUser();

  const [user, setUser] = useImmer<User>(fetchedUser);

  const { data, loading, error } = useFetch<User[]>('/users');

  const { contacts } = user;

  // State for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer<User[]>([]);
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState<BottomBarType>({
    id: user.user_id,
    status: user.status_text,
  });

  // Set allUsersFiltered state once all users data are fetched and sort the array
  // Sort contacts
  useEffect(() => {
    if (data) {
      setAllUsersFiltered(
        data.filter((dbUser) => dbUser.user_id !== user.user_id),
      );
      setAllUsersFiltered((draft) => {
        draft.sort(sortByStatusIcon);
      });
    }
    if (user) {
      setUser((draft) => {
        if (!draft) return;
        draft.contacts.sort(sortByStatusIcon);
      });
    }
  }, [data, user]);

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon during the use of the app
  useChangeStatusIcon(user, setUser, previousStatusIcon, setPreviousStatusIcon);

  // Manage events emitted by the server
  useEventsHomePage(setAllUsersFiltered, setUser, user);

  return (
    <StyledHomePage>
      <TopBar user={user} setUser={setUser} />
      <ContactsBar />
      <MiddleSection>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <Outlet
            context={{
              allUsersFiltered,
              contacts,
              user,
              setUser,
              setBottomBarText,
            }}
          />
        )}
      </MiddleSection>
      <BottomBar bottomBarText={bottomBarText} />
      <StatusBar user={user} setUser={setUser} />
    </StyledHomePage>
  );
}
