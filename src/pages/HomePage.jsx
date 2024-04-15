import API_URL from '../API';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { useCheckAuth, statusIcons } from '../helpers';
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
import { toast } from 'react-toastify';

function HomePage() {
  const navigate = useNavigate();

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
  // State for managing Bottom Bar text
  const [bottomBarText, setBottomBarText] = useState({
    id: user.user_id,
    status: user.status_text,
  });

  // Logout user, show toast and redirect to the Login page
  async function logOut(event) {
    event.preventDefault();
    const res = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      return toast.error('There was an error. Please try again');
    }
    toast.success('You have been logged out successfully');
    return navigate('/login');
  }

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
      <StatusBar>
        <div className="status">
          <img src={user.status_icon} alt="Status Icon" />
          <p>My status</p>
          <div className="statuses-drop-down">
            <div>
              <img src={statusIcons.available} alt="Status Icon - Available" />
              <p>Available</p>
            </div>
            <div>
              <img src={statusIcons.brb} alt="Status Icon - Be Right Back" />
              <p>Be Right Back</p>
            </div>
            <div>
              <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
              <p>Invisible</p>
            </div>
          </div>
        </div>
        <PiDotsThreeOutlineFill title="Options" />
      </StatusBar>
    </StyledHomePage>
  );
}

export default HomePage;
