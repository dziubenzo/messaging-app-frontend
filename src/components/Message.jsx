import PropTypes from 'prop-types';
import { StyledMessage } from '../styles/ChatPage.styled';
import { format } from 'date-fns';
import parse from 'html-react-parser';

function Message({ message, loggedInUser }) {
  const isSender = message.sender._id === loggedInUser._id;

  return (
    <StyledMessage sender={isSender ? 'true' : undefined}>
      <p className="sender">
        {isSender ? 'Me' : message.sender.username}
        <span className="date" title={format(message.date, 'd MMMM y')}>
          {' (' + format(message.date, 'HH:mm') + ')'}
        </span>
      </p>
      <p className="message">{parse(message.text)}</p>
    </StyledMessage>
  );
}

Message.propTypes = {
  message: PropTypes.object,
  loggedInUser: PropTypes.object,
};

export default Message;
