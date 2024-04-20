import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import {
  useChangeToAvailable,
  useChangeToUnavailable,
  useCheckAuth,
} from '../helpers';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import ContactsBar from '../components/ContactsBar';
import BottomBar from '../components/BottomBar';
import { StyledHomePage, MiddleSection } from '../styles/HomePage.styled';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import { useEventsHomePage } from '../socket';

function HomePage() {
  const { user, setUser } = useOutletContext();
  useCheckAuth(setUser);

  const allUsers = useLoaderData();
  const { contacts } = user;

  // State for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer(
    allUsers.filter((dbUser) => dbUser.user_id !== user.user_id),
  );
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState({
    id: user.user_id,
    status: user.status_text,
  });

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon to unavailable on unload
  useChangeToUnavailable(user, setUser);

  // Manage events emitted by the server
  useEventsHomePage(setAllUsersFiltered, setUser);

  return (
    <StyledHomePage>
      <TopBar />
      <ContactsBar />
      <MiddleSection>
        <Outlet
          context={{
            allUsersFiltered,
            contacts,
            user,
            setUser,
            setBottomBarText,
          }}
        />
      </MiddleSection>
      <BottomBar bottomBarText={bottomBarText} />
      <StatusBar />
    </StyledHomePage>
  );
}

export default HomePage;
