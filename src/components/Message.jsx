import PropTypes from 'prop-types';
import { StyledMessage } from '../styles/ChatPage.styled';
import { format } from 'date-fns';
import parse from 'html-react-parser';

function Message({ message, sender, recipient }) {
  const isSender = message.sender === sender._id;

  return (
    <StyledMessage sender={isSender}>
      <p className="sender">
        {isSender ? 'Me' : recipient.username}
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
  sender: PropTypes.object,
  recipient: PropTypes.object,
};

export default Message;
