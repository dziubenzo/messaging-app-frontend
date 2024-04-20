import Contact from '../components/Contact';
import { useOutletContext } from 'react-router-dom';

function ContactsTab() {
  const { user, setUser, contacts, setBottomBarText } = useOutletContext();

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
