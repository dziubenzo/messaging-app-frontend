import PropTypes from 'prop-types';
import { StyledMessages } from '../styles/ChatPage.styled';
import Message from './Message';
import { BarLoader } from 'react-spinners';

function Messages({ loading, messages, sender, recipient }) {
  return (
    <StyledMessages>
      <div className="messages">
        {loading ? (
          <BarLoader className="spinner" color="#ff7f3f" size={30} />
        ) : (
          messages.map((message) => {
            return (
              <Message
                key={message._id}
                message={message}
                sender={sender}
                recipient={recipient}
              />
            );
          })
        )}
      </div>
    </StyledMessages>
  );
}

Messages.propTypes = {
  loading: PropTypes.bool,
  messages: PropTypes.array,
  sender: PropTypes.object,
  recipient: PropTypes.object,
};

export default Messages;
