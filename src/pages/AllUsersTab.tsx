import { useOutletContext } from 'react-router-dom';
import Contact from '../components/Contact';
import type { OutletContext } from '../types';

function AllUsersTab() {
  const { allUsersFiltered } =
    useOutletContext<OutletContext>();

  return (
    <>
      {allUsersFiltered.map((filteredUser) => {
        return (
          <Contact
            key={filteredUser.user_id}
            contact={filteredUser}
            isContact={false}
          />
        );
      })}
    </>
  );
}

export default AllUsersTab;
