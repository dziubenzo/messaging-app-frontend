import PropTypes from 'prop-types';
import { StyledBottomBar } from '../styles/HomePage.styled';

function BottomBar({ bottomBarText }) {
  return (
    <StyledBottomBar>
      <p>ID {bottomBarText.id}</p>
      <p className="text-status">{bottomBarText.status}</p>
    </StyledBottomBar>
  );
}

BottomBar.propTypes = {
  bottomBarText: PropTypes.object,
};

export default BottomBar;
