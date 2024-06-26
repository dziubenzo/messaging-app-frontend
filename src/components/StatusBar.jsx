import API_URL from '../API';
import { StyledStatusBar } from '../styles/HomePage.styled';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import { statusIcons } from '../helpers';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { socket } from '../socket';

function StatusBar() {
  const { pathname } = useLocation();
  const { user, setUser } = useOutletContext();

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);
  const { user_id, status_icon } = user;

  // Change logged in user's status icon
  // Show toast if operation successful or unsuccessful and update user state if the former is true
  // Return if the clicked icon is the same as the current logged in user's icon
  async function changeStatusIcon(imageURL) {
    if (inProgress || status_icon === imageURL) {
      return;
    }
    const toastRef = toast.info('Changing status icon...');
    setInProgress(true);
    const res = await fetch(`${API_URL}/users/${user_id}/change-status-icon`, {
      method: 'PUT',
      body: JSON.stringify({
        image_url: imageURL,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      setInProgress(false);
      return toast.update(toastRef, {
        render: 'There was an error. Please try again',
        type: 'error',
      });
    }
    const updatedUser = await res.json();
    setUser(updatedUser);
    setInProgress(false);
    socket.emit('change status icon', user_id, imageURL);
    return toast.update(toastRef, {
      render: `Status icon changed successfully`,
      type: 'success',
      icon: <img className="toast-icon" src={imageURL} />,
    });
  }

  return (
    <StyledStatusBar>
      <div className="status" title="Change Your Status Icon">
        <img src={user.status_icon} alt="Status Icon" />
        <p>My status</p>
        <div className="statuses-drop-down">
          <div onClick={() => changeStatusIcon(statusIcons.available)}>
            <img src={statusIcons.available} alt="Status Icon - Available" />
            <p>Available</p>
          </div>
          <div onClick={() => changeStatusIcon(statusIcons.brb)}>
            <img src={statusIcons.brb} alt="Status Icon - Be Right Back" />
            <p>Be Right Back</p>
          </div>
          <div onClick={() => changeStatusIcon(statusIcons.invisible)}>
            <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
            <p>Invisible</p>
          </div>
        </div>
      </div>
      <NavLink
        to={pathname !== '/home/options' ? '/home/options' : '/home'}
        title="Options"
      >
        <PiDotsThreeOutlineFill />
      </NavLink>
    </StyledStatusBar>
  );
}

export default StatusBar;
