import { useLoaderData, useOutletContext } from 'react-router-dom';
import {
  useChangeToAvailable,
  useChangeToUnavailable,
  useCheckAuth,
} from '../helpers';
import Contact from '../components/Contact';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import ContactsBar from '../components/ContactsBar';
import BottomBar from '../components/BottomBar';
import Options from '../components/Options';
import GroupChats from '../components/GroupChats';
import { StyledHomePage, UsersList } from '../styles/HomePage.styled';
import { useState } from 'react';
import { useImmer } from 'use-immer';
import { useEventsHomePage } from '../socket';

function HomePage() {
  const { user, setUser } = useOutletContext();
  useCheckAuth(setUser);

  const allUsers = useLoaderData();
  const { contacts } = user;

  // Immer state for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer(
    allUsers.filter((dbUser) => dbUser.user_id !== user.user_id),
  );
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState({
    id: user.user_id,
    status: user.status_text,
  });
  // State for toggling between All Users/Contacts/Group Chats tabs
  const [showTab, setShowTab] = useState([true, false, false]);
  // State for showing options
  const [showOptions, setShowOptions] = useState(false);

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon to unavailable on unload
  useChangeToUnavailable(user, setUser);

  // Manage events emitted by the server
  useEventsHomePage(setAllUsersFiltered, setUser);

  return (
    <StyledHomePage>
      <TopBar />
      <ContactsBar showTab={showTab} setShowTab={setShowTab} />
      {showOptions ? (
        <Options
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setBottomBarText={setBottomBarText}
        />
      ) : (
        <UsersList>
          {showTab[0] ? (
            allUsersFiltered.map((filteredUser) => {
              return (
                <Contact
                  key={filteredUser.user_id}
                  loggedInUser={user}
                  user={filteredUser}
                  setUser={setUser}
                  showTab={showTab}
                  setBottomBarText={setBottomBarText}
                />
              );
            })
          ) : showTab[1] ? (
            contacts.map((contact) => {
              return (
                <Contact
                  key={contact.user_id}
                  loggedInUser={user}
                  user={contact}
                  setUser={setUser}
                  showTab={showTab}
                  setBottomBarText={setBottomBarText}
                />
              );
            })
          ) : (
            <GroupChats />
          )}
        </UsersList>
      )}
      <BottomBar bottomBarText={bottomBarText} />
      <StatusBar
        user={user}
        setUser={setUser}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
      />
    </StyledHomePage>
  );
}

export default HomePage;
