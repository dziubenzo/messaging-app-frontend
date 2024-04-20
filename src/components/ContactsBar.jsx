import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StyledContactsBar } from '../styles/HomePage.styled';
import { LiaUsersSolid, LiaUser, LiaUserFriendsSolid } from 'react-icons/lia';

function ContactsBar() {
  return (
    <StyledContactsBar>
      <NavLink to="/home" end>
        <div>
          <LiaUsersSolid />
          <p>All Users</p>
        </div>
      </NavLink>
      <NavLink to="/home/contacts">
        <div>
          <LiaUser />
          <p>Contacts</p>
        </div>
      </NavLink>
      <NavLink to="/home/group-chats">
        <div>
          <LiaUserFriendsSolid />
          <p>Group Chats</p>
        </div>
      </NavLink>
    </StyledContactsBar>
  );
}

ContactsBar.propTypes = {
  showTab: PropTypes.array,
  setShowTab: PropTypes.func,
};

export default ContactsBar;
