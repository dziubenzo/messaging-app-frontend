import PropTypes from 'prop-types';
import API_URL from '../API';
import { StyledContact } from '../styles/HomePage.styled';
import { GoPersonAdd } from 'react-icons/go';
import { toast } from 'react-toastify';

function Contact({ loggedInUser, user, setUser }) {
  const { username, status_icon, _id } = user;
  const { user_id, contacts } = loggedInUser;

  // Do not show add contact icon if user is already logged in user's contact
  function isUserInContacts() {
    for (const contact of contacts) {
      if (contact._id === _id) {
        return true;
      }
    }
    return false;
  }

  // Add a contact to logged in user's contacts
  // Show toast if operation successful or unsuccessful and update user state if the former is true
  async function addContact() {
    const res = await fetch(`${API_URL}/users/${user_id}/add-contact`, {
      method: 'PUT',
      body: JSON.stringify({
        contact_id: _id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      return toast.error('There was an error. Please try again');
    }
    const updatedUser = await res.json();
    setUser(updatedUser);
    return toast.success(`User ${username} has been added to your contacts`);
  }

  return (
    <StyledContact>
      <img src={status_icon} alt={`Status Icon - ${username}`} />
      <div className="user-info">
        <p className="username">{username}</p>
        <p className="text-status">Some future status</p>
      </div>
      {!isUserInContacts() && <GoPersonAdd onClick={addContact} />}
    </StyledContact>
  );
}
Contact.propTypes = {
  loggedInUser: PropTypes.object,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Contact;
