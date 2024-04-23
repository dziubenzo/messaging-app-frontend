import { useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API';
import {
  StyledForm,
  StyledNameInputField,
  StyledContacts,
  StyledContactCheckbox,
} from '../styles/NewGroupChatTab.styled';
import { toast } from 'react-toastify';

function NewGroupChatTab() {
  const navigate = useNavigate();
  const { user, contacts } = useOutletContext();

  // Create new group chat if there are at least two members selected
  async function createGroupChat(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const members = formData.getAll('contact');
    if (members.length < 2) {
      return toast.error('You need to select at least two contacts');
    }
    members.push(user._id);
    const newChat = {
      name: formData.get('name'),
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
      toast.error('Creating group chat failed');
      return;
    }
    const newGroupChat = await res.json();
    toast.success('Group chat created successfully!');
    return navigate('/home/group-chats');
  }

  if (!contacts.length) {
    return (
      <div className="no-contacts-wrapper">
        <p>Add some contacts first!</p>
      </div>
    );
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
                id={contact.user_id}
                name="contact"
                value={contact._id}
              />
              <label htmlFor={contact.user_id}>{contact.username}</label>
            </StyledContactCheckbox>
          );
        })}
      </StyledContacts>
      <button type="submit">Create</button>
    </StyledForm>
  );
}

export default NewGroupChatTab;
