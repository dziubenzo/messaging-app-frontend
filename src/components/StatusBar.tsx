import { useState } from 'react';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import type { Updater } from 'use-immer';
import API_URL from '../API';
import { STATUS_ICONS } from '../constants';
import { socket } from '../socket';
import { StyledStatusBar } from '../styles/HomePage.styled';
import type { StatusIcon, User } from '../types';
import DevInfo from './DevInfo';

type StatusBarProps = {
  user: User;
  setUser: Updater<User>;
  previousPathname: string;
};

function StatusBar({ user, setUser, previousPathname }: StatusBarProps) {
  const { pathname } = useLocation();

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);
  const { user_id, status_icon } = user;

  // Change logged in user's status icon
  // Show toast if operation successful or unsuccessful and update user state if the former is true
  // Return if the clicked icon is the same as the current logged in user's icon
  async function changeStatusIcon(imageURL: StatusIcon) {
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
    const updatedUser: User = await res.json();
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
          <button
            title="Change Your Status Icon To Available"
            onClick={() => changeStatusIcon(STATUS_ICONS.available)}
          >
            <img src={STATUS_ICONS.available} alt="Status Icon - Available" />
            <p>Available</p>
          </button>
          <button
            title="Change Your Status Icon To Be Right Back"
            onClick={() => changeStatusIcon(STATUS_ICONS.brb)}
          >
            <img src={STATUS_ICONS.brb} alt="Status Icon - Be Right Back" />
            <p>Be Right Back</p>
          </button>
          <button
            title="Change Your Status Icon To Invisible"
            onClick={() => changeStatusIcon(STATUS_ICONS.invisible)}
          >
            <img src={STATUS_ICONS.invisible} alt="Status Icon - Invisible" />
            <p>Invisible</p>
          </button>
        </div>
      </div>
      <DevInfo />
      <NavLink
        to={pathname === '/home/options' ? previousPathname : '/home/options'}
        title="Options"
        state={{ previousPathname: pathname }}
      >
        <PiDotsThreeOutlineFill />
      </NavLink>
    </StyledStatusBar>
  );
}

export default StatusBar;
