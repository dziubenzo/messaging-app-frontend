import Contact from '../components/Contact';
import { useOutletContext } from 'react-router-dom';
import { HomePageOutletContext } from '../types';

function AllUsersTab() {
  const { user, setUser, allUsersFiltered, setBottomBarText } =
    useOutletContext<HomePageOutletContext>();

  return (
    <>
      {allUsersFiltered.map((filteredUser) => {
        return (
          <Contact
            key={filteredUser.user_id}
            loggedInUser={user}
            user={filteredUser}
            setUser={setUser}
            setBottomBarText={setBottomBarText}
            isContact={false}
          />
        );
      })}
    </>
  );
}

export default AllUsersTab;
