import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../API';
import BoldToastMessage from '../components/BoldToastMessage';
import NoContacts from '../components/NoContacts';
import { buildHeader, sortByUsername } from '../helpers';
import { socket } from '../socket';
import {
  StyledContactCheckbox,
  StyledContacts,
  StyledForm,
  StyledNameInputField,
} from '../styles/NewGroupChatTab.styled';
import type { GroupChat, OutletContext, User } from '../types';

function NewGroupChatTab() {
  const navigate = useNavigate();
  const { user, setGroupChats } = useOutletContext<OutletContext>();

  const sortedContacts = useMemo(() => {
    return user.contacts.toSorted(sortByUsername);
  }, [user]);

  const [inProgress, setInProgress] = useState(false);

  // Create new group chat if there are at least two members selected
  async function createGroupChat(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const members = formData.getAll('contact') as User['_id'][];
    if (members.length < 2) {
      return toast.error('Select at least two contacts');
    }
    setInProgress(true);
    const toastRef = toast.info('Creating group chat...');
    members.push(user._id);
    const newChatName = formData.get('name') as string;
    if (!newChatName) {
      setInProgress(false);
      return;
    }
    const newChat = {
      name: newChatName,
      created_by: user._id,
      members,
    };
    const res = await fetch(
      `${API_URL}/group-chats/`,
      buildHeader('POST', newChat),
    );
    if (!res.ok) {
      const error = await res.json();
      setInProgress(false);
      return toast.update(toastRef, {
        render: error,
        type: 'error',
      });
    }
    const newGroupChat: GroupChat = await res.json();
    setGroupChats((draft) => {
      draft.push(newGroupChat);
    });
    socket.emit('create group chat', members, newGroupChat);
    toast.update(toastRef, {
      render: (
        <BoldToastMessage
          bold={newChat.name as string}
          text="created successfully"
        />
      ),
      type: 'success',
    });
    return navigate('/home/group-chats');
  }

  if (!user.contacts.length) {
    return <NoContacts message="Add some contacts first" />;
  }

  return (
    <StyledForm method="post" onSubmit={createGroupChat}>
      <StyledNameInputField>
        <label htmlFor="name">Group Chat Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          minLength={3}
          maxLength={32}
          required
        />
      </StyledNameInputField>
      <p>Contacts (at least 2):</p>
      <StyledContacts>
        {!sortedContacts.length && <p>Add some contacts first!</p>}
        {sortedContacts.map((contact) => {
          return (
            <StyledContactCheckbox key={contact.user_id}>
              <input
                type="checkbox"
                id={contact.user_id.toString()}
                name="contact"
                value={contact._id}
              />
              <label htmlFor={contact.user_id.toString()}>
                {contact.username}
              </label>
            </StyledContactCheckbox>
          );
        })}
      </StyledContacts>
      <button type="submit">{inProgress ? 'Creating...' : 'Create'}</button>
    </StyledForm>
  );
}

export default NewGroupChatTab;
