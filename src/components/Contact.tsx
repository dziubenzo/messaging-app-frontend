import { useState } from 'react';
import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import API_URL from '../API';
import { STATUS_ICONS } from '../constants';
import { buildHeader, sortByStatusIcon } from '../helpers';
import { StyledContact } from '../styles/HomePage.styled';
import type { OutletContext, User } from '../types';
import BoldToastMessage from './BoldToastMessage';

type ContactProps = {
  contact: User;
  isContact: boolean;
};

function Contact({ contact, isContact }: ContactProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setBottomBarText } = useOutletContext<OutletContext>();

  const { username, status_icon, status_text, _id } = contact;
  const { user_id, contacts } = user;

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
  async function addContact(event: React.MouseEvent<HTMLButtonElement>) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Adding contact...');
    event.stopPropagation();
    setInProgress(true);
    const res = await fetch(
      `${API_URL}/users/${user_id}/add-contact`,
      buildHeader('PUT', { contact_id: _id }),
    );
    if (!res.ok) {
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    const updatedUser: User = await res.json();
    setUser(updatedUser);
    setUser((draft) => {
      if (!draft) return;
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
  async function removeContact(event: React.MouseEvent<HTMLButtonElement>) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Removing contact...');
    event.stopPropagation();
    setInProgress(true);
    const res = await fetch(
      `${API_URL}/users/${user_id}/remove-contact`,
      buildHeader('DELETE', { contact_id: _id }),
    );
    if (!res.ok) {
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    const updatedUser: User = await res.json();
    setUser(updatedUser);
    setUser((draft) => {
      if (!draft) return;
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
    setBottomBarText({ id: contact.user_id, status: contact.status_text });
  }

  // Reset bottom bar fields to logged in user if no user is hovered over
  function handleUserMouseLeave() {
    setBottomBarText({
      id: user.user_id,
      status: user.status_text,
    });
  }

  return (
    <StyledContact
      onMouseEnter={handleUserMouseEnter}
      onMouseLeave={handleUserMouseLeave}
      onClick={() =>
        navigate(`/chats/${contact.user_id}`, {
          state: { previousPathname: pathname },
        })
      }
      title={`Click to chat with ${username}`}
    >
      <img
        src={
          status_icon === STATUS_ICONS.invisible
            ? STATUS_ICONS.unavailable
            : status_icon
        }
        alt={`Status Icon - ${username}`}
      />
      <div className="user-info">
        <p className="username">{username}</p>
        <p className="text-status">{status_text}</p>
      </div>
      {inProgress ? (
        <PulseLoader className="in-progress-spinner" size={5} />
      ) : isContact ? (
        <button
          title="Remove Contact"
          className="remove-contact-btn"
          onClick={removeContact}
        >
          <IoPersonRemoveOutline />
        </button>
      ) : (
        !isUserInContacts() && (
          <button
            title="Add Contact"
            className="add-contact-btn"
            onClick={addContact}
          >
            <IoPersonAddOutline />
          </button>
        )
      )}
    </StyledContact>
  );
}

export default Contact;
