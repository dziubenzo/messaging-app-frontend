import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Contact from '../components/Contact';
import NoContacts from '../components/NoContacts';
import { sortByStatusIcon } from '../helpers';
import { OutletContext } from '../types';

function ContactsTab() {
  const { user } = useOutletContext<OutletContext>();

  const sortedContacts = useMemo(() => {
    return user.contacts.toSorted(sortByStatusIcon);
  }, [user]);

  if (!user.contacts.length) {
    return <NoContacts message="Add contacts to see them here" />;
  }

  return (
    <>
      {sortedContacts.map((contact) => {
        return (
          <Contact
            key={contact.user_id}
            contact={contact}
            isContact={true}
          />
        );
      })}
    </>
  );
}

export default ContactsTab;
