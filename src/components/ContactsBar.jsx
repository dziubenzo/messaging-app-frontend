import PropTypes from 'prop-types';
import { StyledContactsBar } from '../styles/HomePage.styled';
import { LiaUsersSolid, LiaUser, LiaUserFriendsSolid } from 'react-icons/lia';

function ContactsBar({ showTab, setShowTab }) {
  return (
    <StyledContactsBar>
      <div
        className="all-users"
        aria-label="All Users Tab"
        onClick={() => setShowTab([true, false, false])}
      >
        <LiaUsersSolid />
        <p className={showTab[0] ? 'active' : undefined}>All Users</p>
      </div>
      <div
        className="contacts"
        aria-label="Contacts Tab"
        onClick={() => setShowTab([false, true, false])}
      >
        <LiaUser />
        <p className={showTab[1] ? 'active' : undefined}>Contacts</p>
      </div>
      <div
        className="group-chats"
        aria-label="Group Chats Tab"
        onClick={() => setShowTab([false, false, true])}
      >
        <LiaUserFriendsSolid />
        <p className={showTab[2] ? 'active' : undefined}>Group Chats</p>
      </div>
    </StyledContactsBar>
  );
}

ContactsBar.propTypes = {
  showTab: PropTypes.array,
  setShowTab: PropTypes.func,
};

export default ContactsBar;
