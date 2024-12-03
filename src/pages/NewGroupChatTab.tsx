import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../API';
import BoldToastMessage from '../components/BoldToastMessage';
import NoContacts from '../components/NoContacts';
import { socket } from '../socket';
import {
  StyledContactCheckbox,
  StyledContacts,
  StyledForm,
  StyledNameInputField,
} from '../styles/NewGroupChatTab.styled';
import type { GroupChat, OutletContext } from '../types';

function NewGroupChatTab() {
  const navigate = useNavigate();
  const { user, contacts, setGroupChats } = useOutletContext<OutletContext>();

  // Create new group chat if there are at least two members selected
  async function createGroupChat(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const members = formData.getAll('contact');
    if (members.length < 2) {
      return toast.error('Select at least two contacts');
    }
    const toastRef = toast.info('Creating group chat...');
    members.push(user._id);
    const newChatName = formData.get('name');
    if (!newChatName) return;
    const newChat = {
      name: newChatName,
      created_by: user._id,
      members,
    };
    const res = await fetch(`${API_URL}/group-chats/`, {
      method: 'POST',
      body: JSON.stringify(newChat),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      toast.update(toastRef, {
        render: 'Creating group chat failed',
        type: 'error',
      });
      return;
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

  if (!contacts.length) {
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
        {!contacts.length && <p>Add some contacts first!</p>}
        {contacts.map((contact) => {
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
      <button type="submit">Create</button>
    </StyledForm>
  );
}

export default NewGroupChatTab;
