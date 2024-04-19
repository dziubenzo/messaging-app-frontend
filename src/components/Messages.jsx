import PropTypes from 'prop-types';
import { StyledMessages } from '../styles/ChatPage.styled';
import Message from './Message';
import { BarLoader } from 'react-spinners';
import { useRef } from 'react';
import { useScrollToBottom } from '../helpers';

function Messages({ loading, messages, sender, recipient }) {
  const messagesRef = useRef(null);

  // Scroll to bottom when messages change
  useScrollToBottom(messagesRef, messages);

  return (
    <StyledMessages ref={messagesRef}>
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
  messagesRef: PropTypes.object,
};

export default Messages;
