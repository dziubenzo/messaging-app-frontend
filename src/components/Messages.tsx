import { useRef } from 'react';
import { useScrollToBottom } from '../helpers';
import { StyledMessages } from '../styles/ChatPage.styled';
import type { GroupChatMessage, Message as MessageType, User } from '../types';
import Error from './Error';
import IsTyping from './IsTyping';
import Loading from './Loading';
import Message from './Message';
import NoMessages from './NoMessages';

type MessagesProps = {
  loading: boolean;
  error: string;
  messages: MessageType[] | GroupChatMessage[];
  loggedInUser: User;
  someoneIsTyping: boolean;
  typingUsername: User['username'];
};

function Messages({
  loading,
  error,
  messages,
  loggedInUser,
  someoneIsTyping,
  typingUsername,
}: MessagesProps) {
  const messagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or someone is typing
  useScrollToBottom(messagesRef, messages, someoneIsTyping);

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
              key={'_id' in message ? message._id : crypto.randomUUID()}
              message={message}
              loggedInUser={loggedInUser}
            />
          );
        })}
        {someoneIsTyping && <IsTyping username={typingUsername} />}
      </div>
    </StyledMessages>
  );
}

export default Messages;
