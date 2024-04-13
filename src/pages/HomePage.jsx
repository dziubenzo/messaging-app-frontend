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

  const [allUsersFiltered, setAllUsersFiltered] = useState(
    allUsers.filter((dbUser) => dbUser.user_id !== user.user_id),
  );

  return (
    <StyledHomePage>
      <TopBar>
        <img src={user.status_icon} alt="Status Icon" />
        <p>Me ({user.user_id})</p>
        <AiOutlineLogout title="Log Out" />
      </TopBar>
      <ContactsBar>
        <div className="all-users">
          <LiaUsersSolid />
          <p>All Users</p>
        </div>
        <div className="contacts">
          <LiaUserFriendsSolid />
          <p>Contacts</p>
        </div>
      </ContactsBar>
      <UsersList>
        {allUsersFiltered.map((user) => {
          return <Contact key={user.user_id} user={user} />;
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
