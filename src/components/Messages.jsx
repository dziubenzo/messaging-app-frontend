import PropTypes from 'prop-types';
import { StyledMessages } from '../styles/ChatPage.styled';
import Message from './Message';
import Loading from './Loading';
import Error from './Error';
import NoMessages from './NoMessages';
import { useRef } from 'react';
import { useScrollToBottom } from '../helpers';

function Messages({ loading, error, messages, loggedInUser }) {
  const messagesRef = useRef(null);

  // Scroll to bottom when messages change
  useScrollToBottom(messagesRef, messages);

  if (loading) {
    return (
      <StyledMessages ref={messagesRef}>
        <Loading />
      </StyledMessages>
    );
  }

  if (error) {
    return (
      <StyledMessages ref={messagesRef}>
        <Error />
      </StyledMessages>
    );
  }

  if (!messages.length) {
    return (
      <StyledMessages ref={messagesRef}>
        <NoMessages />
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
