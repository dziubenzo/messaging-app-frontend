import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import BottomBar from '../components/BottomBar';
import ContactsBar from '../components/ContactsBar';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import {
  sortByStatusIcon,
  useChangeStatusIcon,
  useChangeToAvailable,
  useUser,
} from '../helpers';
import { useEventsHomePage } from '../socket';
import { MiddleSection, StyledHomePage } from '../styles/HomePage.styled';
import type { BottomBar as BottomBarType, OutletContext, User } from '../types';

export default function HomePage() {
  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();

  const { user: fetchedUser, allUsers } = useUser();
  const [user, setUser] = useImmer<User>(fetchedUser);
  const [allUsersFiltered, setAllUsersFiltered] = useImmer<User[]>(allUsers!);

  const { contacts } = user;

  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState<BottomBarType>({
    id: user.user_id,
    status: user.status_text,
  });

  // Sort all users and logged in user's contacts
  useEffect(() => {
    if (allUsers) {
      setAllUsersFiltered((draft) =>
        draft
          .filter((dbUser) => dbUser.user_id !== user.user_id)
          .sort(sortByStatusIcon),
      );
    }
    if (user) {
      setUser((draft) => {
        draft.contacts.sort(sortByStatusIcon);
      });
    }
  }, [allUsers, user]);

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
      <StatusBar user={user} setUser={setUser} />
    </StyledHomePage>
  );
}
