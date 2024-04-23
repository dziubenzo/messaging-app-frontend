import { useOutletContext } from 'react-router-dom';
import {
  StyledForm,
  StyledNameInputField,
  StyledContacts,
  StyledContactCheckbox,
} from '../styles/NewGroupChatTab.styled';
import { toast } from 'react-toastify';

function NewGroupChatTab() {
  const { user, contacts } = useOutletContext();

  function createGroupChat(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const members = formData.getAll('contact');
    if (members.length < 2) {
      toast.error('You need to select at least two contacts');
    }
    members.push(user._id);
    const newGroupChat = {
      name: formData.get('name'),
      created_by: user._id,
      members,
    };
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
