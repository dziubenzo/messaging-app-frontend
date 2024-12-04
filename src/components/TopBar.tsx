import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Updater } from 'use-immer';
import API_URL from '../API';
import { STATUS_ICONS } from '../constants';
import { changeStatusIcon } from '../helpers';
import { socket } from '../socket';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { User } from '../types';

type TopBarProps = {
  user: User;
  setUser: Updater<User>;
};

function TopBar({ user, setUser }: TopBarProps) {
  const navigate = useNavigate();

  // Logout user, show toast and redirect to the Login page
  // Change status icon to unavailable
  // Wait for status icon change to finish before logging out
  async function logOut(event: React.MouseEvent<SVGElement, MouseEvent>) {
    event.preventDefault();
    if (!user) return;
    const toastRef = toast.info('Logging out...');
    socket.emit('change status icon', user.user_id, STATUS_ICONS.unavailable);
    await changeStatusIcon(user, setUser, STATUS_ICONS.unavailable);
    const res = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      socket.emit('change status icon', user.user_id, STATUS_ICONS.available);
      changeStatusIcon(user, setUser, STATUS_ICONS.available);
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    toast.update(toastRef, {
      render: 'You have been logged out successfully',
      type: 'success',
    });
    return navigate('/login');
  }

  return (
    <StyledTopBar>
      <img src={user.status_icon} alt="Status Icon" />
      <p>Me ({user.user_id})</p>
      <AiOutlineLogout title="Log Out" onClick={logOut} />
    </StyledTopBar>
  );
}

export default TopBar;
