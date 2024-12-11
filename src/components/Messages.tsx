import { isSameDay } from 'date-fns';
import { Fragment, useRef } from 'react';
import { useObserveMessagesDiv, useScrollToBottom } from '../helpers';
import { StyledMessages } from '../styles/ChatPage.styled';
import type { GroupChatMessage, Message as MessageType, User } from '../types';
import Day from './Day';
import IsTyping from './IsTyping';
import Message from './Message';
import NoMessages from './NoMessages';

type MessagesProps = {
  messages: MessageType[] | GroupChatMessage[];
  loggedInUser: User;
  someoneIsTyping: boolean;
  typingUsername: User['username'];
};

function Messages({
  messages,
  loggedInUser,
  someoneIsTyping,
  typingUsername,
}: MessagesProps) {
  const messagesRef = useRef<HTMLDivElement>(null);

  const messagesDivHeight = useObserveMessagesDiv(messagesRef, 200, 2000);

  useScrollToBottom(messagesRef, messages, someoneIsTyping, messagesDivHeight);

  if (!messages.length) {
    return (
      <StyledMessages ref={messagesRef}>
        <NoMessages />
      </StyledMessages>
    );
  }

  // Render day component if it is the first message in a chat or the date of the previous message is different from the date of the current message
  function renderMessages() {
    return messages.map((message, index) => {
      if (index === 0 || !isSameDay(message.date, messages[index - 1].date)) {
        return (
          <Fragment key={'_id' in message ? message._id : crypto.randomUUID()}>
            <Day day={message.date} />
            <Message
              key={'_id' in message ? message._id : crypto.randomUUID()}
              message={message}
              loggedInUser={loggedInUser}
            />
          </Fragment>
        );
      } else {
        return (
          <Message
            key={'_id' in message ? message._id : crypto.randomUUID()}
            message={message}
            loggedInUser={loggedInUser}
          />
        );
      }
    });
  }

  // Prevent losing input field focus if the first emoticon (or any, actually) can be selected with querySelector, i.e. the emoticons div is rendered
  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const firstEmoticon = document.querySelector(
      'button[title="Smile Emoticon"]',
    );
    if (firstEmoticon) {
      event.preventDefault();
    }
  }

  return (
    <StyledMessages ref={messagesRef} onMouseDown={handleMouseDown}>
      <div>
        {renderMessages()}
        {someoneIsTyping && <IsTyping username={typingUsername} />}
      </div>
    </StyledMessages>
  );
}

export default Messages;
