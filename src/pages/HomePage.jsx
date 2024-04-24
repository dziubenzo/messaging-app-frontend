import { Outlet, useOutletContext } from 'react-router-dom';
import {
  sortByStatusIcon,
  useChangeToAvailable,
  useChangeToUnavailable,
  useCheckAuth,
  useFetch,
} from '../helpers';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import ContactsBar from '../components/ContactsBar';
import BottomBar from '../components/BottomBar';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { StyledHomePage, MiddleSection } from '../styles/HomePage.styled';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useEventsHomePage } from '../socket';

function HomePage() {
  const { user, setUser } = useOutletContext();
  useCheckAuth(setUser);

  const { data, loading, error } = useFetch('/users');
  const { contacts } = user;

  // State for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer([]);
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState({
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
      setUser((draft) => {
        draft.contacts.sort(sortByStatusIcon);
      });
    }
  }, [data]);

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon to unavailable on unload
  useChangeToUnavailable(user, setUser);

  // Manage events emitted by the server
  useEventsHomePage(setAllUsersFiltered, setUser, user);

  return (
    <StyledHomePage>
      <TopBar />
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
      <StatusBar />
    </StyledHomePage>
  );
}

export default HomePage;
