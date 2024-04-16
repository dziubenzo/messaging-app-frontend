import API_URL from '../API';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import {
  changeStatusIcon,
  statusIcons,
  useChangeToAvailable,
  useChangeToUnavailable,
  useCheckAuth,
} from '../helpers';
import Contact from '../components/Contact';
import StatusBar from '../components/StatusBar';
import {
  StyledHomePage,
  TopBar,
  ContactsBar,
  UsersList,
  BottomBar,
} from '../styles/HomePage.styled';
import { LiaUsersSolid, LiaUserFriendsSolid } from 'react-icons/lia';
import { AiOutlineLogout } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';

import { socket } from '../socket';

function HomePage() {
  const navigate = useNavigate();

  const { user, setUser } = useOutletContext();
  useCheckAuth(setUser);

  const allUsers = useLoaderData();
  const { contacts } = user;

  // Immer state for storing all users except for logged in user
  const [allUsersFiltered, setAllUsersFiltered] = useImmer(
    allUsers.filter((dbUser) => dbUser.user_id !== user.user_id),
  );
  // State for toggling All Users/Contacts tabs
  const [showContacts, setShowContacts] = useState(false);
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState({
    id: user.user_id,
    status: user.status_text,
  });

  // Logout user, show toast and redirect to the Login page
  // Change status icon to unavailable
  // Wait for status icon change to finish before logging out
  async function logOut(event) {
    event.preventDefault();
    toast('Logging out...');
    socket.emit('change status icon', user.user_id, statusIcons.unavailable);
    await changeStatusIcon(user, setUser, statusIcons.unavailable);
    const res = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      socket.emit('change status icon', user.user_id, statusIcons.available);
      changeStatusIcon(user, setUser, statusIcons.available);
      return toast.error('There was an error. Please try again');
    }
    toast.success('You have been logged out successfully');
    setUser({});
    return navigate('/login');
  }

  // Change logged in user's status icon to available on component load
  useChangeToAvailable(user, setUser);

  // Change logged in user's status icon to unavailable on unload
  useChangeToUnavailable(user, setUser);

  // Manage events emitted by the server
  useEffect(() => {
    socket.on('update status icon', (userId, imageURL) => {
      setAllUsersFiltered((draft) => {
        const user = draft.find((user) => user.user_id === userId);
        user.status_icon = imageURL;
      });
    });
  }, []);

  return (
    <StyledHomePage>
      <TopBar>
        <img src={user.status_icon} alt="Status Icon" />
        <p>Me ({user.user_id})</p>
        <AiOutlineLogout title="Log Out" onClick={logOut} />
      </TopBar>
      <ContactsBar>
        <div
          className="all-users"
          aria-label="All Users Button"
          onClick={() => setShowContacts(false)}
        >
          <LiaUsersSolid />
          <p className={!showContacts ? 'active' : undefined}>All Users</p>
        </div>
        <div
          className="contacts"
          aria-label="Contacts Button"
          onClick={() => setShowContacts(true)}
        >
          <LiaUserFriendsSolid />
          <p className={showContacts ? 'active' : undefined}>Contacts</p>
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
                  setBottomBarText={setBottomBarText}
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
                  setBottomBarText={setBottomBarText}
                />
              );
            })}
      </UsersList>
      <BottomBar>
        <p>ID {bottomBarText.id}</p>
        <p className="text-status">{bottomBarText.status}</p>
      </BottomBar>
      <StatusBar user={user} setUser={setUser} />
    </StyledHomePage>
  );
}

export default HomePage;
