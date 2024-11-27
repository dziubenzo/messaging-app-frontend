import { useOutletContext } from 'react-router-dom';
import Contact from '../components/Contact';
import NoContacts from '../components/NoContacts';
import { HomePageOutletContext } from '../types';

function ContactsTab() {
  const { user, setUser, contacts, setBottomBarText } =
    useOutletContext<HomePageOutletContext>();

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
