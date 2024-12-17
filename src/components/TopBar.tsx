import Cookies from 'js-cookie';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { OutletContext, User } from '../types';

type TopBarProps = {
  user: User;
};

function TopBar({ user }: TopBarProps) {
  const navigate = useNavigate();
  const { setIsAuth } = useOutletContext<OutletContext>();

  // Logout user, show toast and redirect to the Login page
  async function logOut(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    Cookies.remove('jwt');
    setIsAuth(false);
    toast.success('You have been logged out successfully');
    return navigate('/login');
  }

  return (
    <StyledTopBar>
      <img src={user.status_icon} alt="Status Icon" />
      <p>Me ({user.user_id})</p>
      <button title="Log Out" onClick={logOut}>
        <AiOutlineLogout />
      </button>
    </StyledTopBar>
  );
}

export default TopBar;
