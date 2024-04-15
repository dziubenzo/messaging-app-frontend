import PropTypes from 'prop-types';
import API_URL from '../API';
import { StyledContact } from '../styles/HomePage.styled';
import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function Contact({
  loggedInUser,
  user,
  setUser,
  showContacts,
  setBottomBarText,
}) {
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

  // Remove a contact from logged in user's contacts
  // Show toast if operation successful or unsuccessful and update user state if the former is true
  async function removeContact() {
    const res = await fetch(`${API_URL}/users/${user_id}/remove-contact`, {
      method: 'DELETE',
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
    return toast.success(
      `User ${username} has been removed from your contacts`,
    );
  }

  // Set bottom bar fields to match hovered over user
  function handleUserMouseEnter() {
    setBottomBarText({ id: user.user_id, status: user.status_text });
  }

  // Reset bottom bar fields to logged in user if no user is hovered over
  function handleUserMouseLeave() {
    setBottomBarText({
      id: loggedInUser.user_id,
      status: loggedInUser.status_text,
    });
  }

  return (
    <StyledContact
      onMouseEnter={handleUserMouseEnter}
      onMouseLeave={handleUserMouseLeave}
    >
      <img src={status_icon} alt={`Status Icon - ${username}`} />
      <div className="user-info">
        <p className="username">{username}</p>
        <p className="text-status">Some future status</p>
      </div>
      {showContacts ? (
        <IoPersonRemoveOutline title="Remove Contact" onClick={removeContact} />
      ) : (
        !isUserInContacts() && (
          <IoPersonAddOutline title="Add Contact" onClick={addContact} />
        )
      )}
    </StyledContact>
  );
}
Contact.propTypes = {
  loggedInUser: PropTypes.object,
  user: PropTypes.object,
  setUser: PropTypes.func,
  showContacts: PropTypes.bool,
  setBottomBarText: PropTypes.func,
};

export default Contact;
