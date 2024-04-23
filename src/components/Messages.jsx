import PropTypes from 'prop-types';
import { StyledMessages } from '../styles/ChatPage.styled';
import Message from './Message';
import { BarLoader } from 'react-spinners';
import { useRef } from 'react';
import { useScrollToBottom } from '../helpers';
import { BiError } from 'react-icons/bi';

function Messages({ loading, error, messages, loggedInUser }) {
  const messagesRef = useRef(null);

  // Scroll to bottom when messages change
  useScrollToBottom(messagesRef, messages);

  if (loading) {
    return (
      <StyledMessages ref={messagesRef}>
        <div className="loading-wrapper">
          <BarLoader color="#ff7f3f" size={30} />
        </div>
      </StyledMessages>
    );
  }

  if (error) {
    return (
      <StyledMessages ref={messagesRef}>
        <div className="error-wrapper">
          <BiError />
          <h3>Error</h3>
        </div>
      </StyledMessages>
    );
  }

  return (
    <StyledMessages ref={messagesRef}>
      <div>
        {messages.map((message) => {
          return (
            <Message
              key={message._id}
              message={message}
              loggedInUser={loggedInUser}
            />
          );
        })}
      </div>
    </StyledMessages>
  );
}

Messages.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  messages: PropTypes.array,
  loggedInUser: PropTypes.object,
};

export default Messages;
