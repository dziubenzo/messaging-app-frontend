import { useState } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import BottomBar from '../components/BottomBar';
import ContactsBar from '../components/ContactsBar';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import {
  getPreviousPathname,
  sortByStatusIcon,
  useChangeStatusIcon,
  useChangeToAvailable,
  useUser,
} from '../helpers';
import { useEventsHomePage } from '../socket';
import { MiddleSection, StyledHomePage } from '../styles/HomePage.styled';
import type {
  BottomBar as BottomBarType,
  GroupChat,
  OutletContext,
  User,
} from '../types';

export default function HomePage() {
  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();
  const { state } = useLocation();
  const previousPathname = getPreviousPathname(state);

  const {
    user: fetchedUser,
    allUsers,
    groupChats: fetchedGroupChats,
  } = useUser();
  const [user, setUser] = useImmer<User>(fetchedUser);
  // Sort all users and filter out the logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer<User[]>(() => {
    return allUsers!
      .filter((dbUser) => dbUser.user_id !== user.user_id)
      .sort(sortByStatusIcon);
  });
  const [groupChats, setGroupChats] = useImmer<GroupChat[]>(fetchedGroupChats!);

  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState<BottomBarType>({
    id: user.user_id,
    status: user.status_text,
  });

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon during the use of the app
  useChangeStatusIcon(user, setUser, previousStatusIcon, setPreviousStatusIcon);

  // Manage events emitted by the server
  useEventsHomePage(setAllUsersFiltered, setUser, user);

  return (
    <StyledHomePage>
      <TopBar user={user} />
      <ContactsBar />
      <MiddleSection>
        <Outlet
          context={{
            user,
            allUsersFiltered,
            groupChats,
            setUser,
            setBottomBarText,
            setGroupChats,
          }}
        />
      </MiddleSection>
      <BottomBar bottomBarText={bottomBarText} />
      <StatusBar
        user={user}
        setUser={setUser}
        previousPathname={previousPathname}
      />
    </StyledHomePage>
  );
}
