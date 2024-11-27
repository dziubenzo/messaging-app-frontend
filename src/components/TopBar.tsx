import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../API';
import { changeStatusIcon, statusIcons } from '../helpers';
import { socket } from '../socket';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { OutletContext } from '../types';

function TopBar() {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext<OutletContext>();

  if (!user) return;

  // Logout user, show toast and redirect to the Login page
  // Change status icon to unavailable
  // Wait for status icon change to finish before logging out
  async function logOut(event: React.MouseEvent<SVGElement, MouseEvent>) {
    event.preventDefault();
    if (!user) return;
    const toastRef = toast.info('Logging out...');
    socket.emit('change status icon', user.user_id, statusIcons.unavailable);
    await changeStatusIcon(user, setUser, statusIcons.unavailable);
    const res = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      socket.emit('change status icon', user.user_id, statusIcons.available);
      changeStatusIcon(user, setUser, statusIcons.available);
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    toast.update(toastRef, {
      render: 'You have been logged out successfully',
      type: 'success',
    });
    setUser(null);
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
