import PropTypes from 'prop-types';
import { StyledStatusBar } from '../styles/HomePage.styled';
import { statusIcons } from '../helpers';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';

function StatusBar({ user, setUser }) {
  return (
    <StyledStatusBar>
      <div className="status">
        <img src={user.status_icon} alt="Status Icon" />
        <p>My status</p>
        <div className="statuses-drop-down">
          <div>
            <img src={statusIcons.available} alt="Status Icon - Available" />
            <p>Available</p>
          </div>
          <div>
            <img src={statusIcons.brb} alt="Status Icon - Be Right Back" />
            <p>Be Right Back</p>
          </div>
          <div>
            <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
            <p>Invisible</p>
          </div>
        </div>
      </div>
      <PiDotsThreeOutlineFill title="Options" />
    </StyledStatusBar>
  );
}

StatusBar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default StatusBar;
