import Contact from '../components/Contact';
import { useOutletContext } from 'react-router-dom';
import NoContacts from '../components/NoContacts';

function ContactsTab() {
  const { user, setUser, contacts, setBottomBarText } = useOutletContext();

  if (!contacts.length) {
    return <NoContacts message="Add contacts to see them here" />;
  }

  return (
    <>
      {contacts.map((contact) => {
        return (
          <Contact
            key={contact.user_id}
            loggedInUser={user}
            user={contact}
            setUser={setUser}
            setBottomBarText={setBottomBarText}
            isContact={true}
          />
        );
      })}
    </>
  );
}

export default ContactsTab;
