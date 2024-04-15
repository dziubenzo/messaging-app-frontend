import { useLoaderData, useOutletContext } from 'react-router-dom';
import { useCheckAuth } from '../helpers';
import Contact from '../components/Contact';
import {
  StyledHomePage,
  TopBar,
  ContactsBar,
  UsersList,
  BottomBar,
  StatusBar,
} from '../styles/HomePage.styled';
import { LiaUsersSolid, LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { AiOutlineLogout } from 'react-icons/ai';
import { useState } from 'react';

function HomePage() {
  const { user, setUser } = useOutletContext();
  useCheckAuth(user, setUser);

  const allUsers = useLoaderData();
  const { contacts } = user;

  // State for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useState(
    allUsers.filter((dbUser) => dbUser.user_id !== user.user_id),
  );
  // State for toggling All Users/Contacts tabs
  const [showContacts, setShowContacts] = useState(false);

  return (
    <StyledHomePage>
      <TopBar>
        <img src={user.status_icon} alt="Status Icon" />
        <p>Me ({user.user_id})</p>
        <AiOutlineLogout title="Log Out" />
      </TopBar>
      <ContactsBar>
        <div
          className="all-users"
          aria-label="All Users Button"
          onClick={() => setShowContacts(false)}
        >
          <LiaUsersSolid />
          <p className={!showContacts && 'active'}>All Users</p>
        </div>
        <div
          className="contacts"
          aria-label="Contacts Button"
          onClick={() => setShowContacts(true)}
        >
          <LiaUserFriendsSolid />
          <p className={showContacts && 'active'}>Contacts</p>
        </div>
      </ContactsBar>
      <UsersList>
        {showContacts
          ? contacts.map((contact) => {
              return (
                <Contact
                  key={contact.user_id}
                  loggedInUser={user}
                  user={contact}
                  setUser={setUser}
                  showContacts={showContacts}
                />
              );
            })
          : allUsersFiltered.map((filteredUser) => {
              return (
                <Contact
                  key={filteredUser.user_id}
                  loggedInUser={user}
                  user={filteredUser}
                  setUser={setUser}
                  showContacts={showContacts}
                />
              );
            })}
      </UsersList>
      <BottomBar>
        <p>ID {user.user_id}</p>
        <p className="text-status">
          {user.status_text || 'Some placeholder status'}
        </p>
      </BottomBar>
      <StatusBar>
        <img src={user.status_icon} alt="Status Icon" />
        <p>My status</p>
        <PiDotsThreeOutlineFill title="Options" />
      </StatusBar>
    </StyledHomePage>
  );
}

export default HomePage;
