import PropTypes from 'prop-types';
import API_URL from '../API';
import { StyledContact } from '../styles/HomePage.styled';
import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { sortByStatusIcon, statusIcons } from '../helpers';
import { useNavigate } from 'react-router-dom';
import BoldToastMessage from './BoldToastMessage';

function Contact({ loggedInUser, user, setUser, setBottomBarText, isContact }) {
  const navigate = useNavigate();

  const { username, status_icon, status_text, _id } = user;
  const { user_id, contacts } = loggedInUser;

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);

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
  // Show updatable toast if operation successful or unsuccessful and update user state if the former is true
  // Sort contacts once the updated user is fetched
  async function addContact(event) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Adding contact...');
    event.stopPropagation();
    setInProgress(true);
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
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    const updatedUser = await res.json();
    setUser(updatedUser);
    setUser((draft) => {
      draft.contacts.sort(sortByStatusIcon);
    });
    setInProgress(false);
    return toast.update(toastRef, {
      render: (
        <BoldToastMessage bold={username} text={'was added to your contacts'} />
      ),
      type: 'success',
    });
  }

  // Remove a contact from logged in user's contacts
  // Show toast if operation successful or unsuccessful and update user state if the former is true
  // Sort contacts once the updated user is fetched
  async function removeContact(event) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Removing contact...');
    event.stopPropagation();
    setInProgress(true);
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
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    const updatedUser = await res.json();
    setUser(updatedUser);
    setUser((draft) => {
      draft.contacts.sort(sortByStatusIcon);
    });
    setInProgress(false);
    return toast.update(toastRef, {
      render: (
        <BoldToastMessage
          bold={username}
          text={'was removed from your contacts'}
        />
      ),
      type: 'success',
    });
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
      onClick={() =>
        navigate(`/chats/${user.user_id}`, { state: { recipient: user } })
      }
      title={`Click to chat with ${username}`}
    >
      <img
        src={
          status_icon === statusIcons.invisible
            ? statusIcons.unavailable
            : status_icon
        }
        alt={`Status Icon - ${username}`}
      />
      <div className="user-info">
        <p className="username">{username}</p>
        <p className="text-status">{status_text}</p>
      </div>
      {isContact ? (
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
  setBottomBarText: PropTypes.func,
  isContact: PropTypes.bool,
};

export default Contact;
