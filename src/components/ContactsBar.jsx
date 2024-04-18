import PropTypes from 'prop-types';
import { StyledContactsBar } from '../styles/HomePage.styled';
import { LiaUsersSolid, LiaUserFriendsSolid } from 'react-icons/lia';

function ContactsBar({ showContacts, setShowContacts }) {
  return (
    <StyledContactsBar>
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
    </StyledContactsBar>
  );
}

ContactsBar.propTypes = {
  showContacts: PropTypes.bool,
  setShowContacts: PropTypes.func,
};

export default ContactsBar;
