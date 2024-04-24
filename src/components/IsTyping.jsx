import PropTypes from 'prop-types';
import { StyledIsTyping } from '../styles/ChatPage.styled';

function IsTyping({ username }) {
  return (
    <StyledIsTyping>
      <span>{username}</span> is typing...
    </StyledIsTyping>
  );
}

IsTyping.propTypes = {
  username: PropTypes.string,
};

export default IsTyping;
