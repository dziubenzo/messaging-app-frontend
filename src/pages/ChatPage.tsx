import { useState } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Editor from '../components/Editor';
import Messages from '../components/Messages';
import { STATUS_ICONS } from '../constants';
import {
  getPreviousPathname,
  useChangeStatusIcon,
  useCloseChatWithEsc,
  useUser,
} from '../helpers';
import { useEventsChatPage } from '../socket';
import { StyledChatPage } from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { Message, OutletContext, User } from '../types';

function ChatPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPathname = getPreviousPathname(state);

  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();

  const {
    user: fetchedUser,
    recipient: fetchedRecipient,
    messages: fetchedMessages,
  } = useUser();

  const [user, setUser] = useImmer<User>(fetchedUser);

  // States for messages
  const [messages, setMessages] = useImmer<Message[]>(fetchedMessages!);
  // State for managing chat recipient
  const [recipient, setRecipient] = useImmer<User>(fetchedRecipient!);

  // States for managing is typing indicator
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState<User['username']>('');

  // Manage events emitted by the server
  useEventsChatPage(
    user,
    recipient,
    setRecipient,
    setMessages,
    setSomeoneIsTyping,
    setTypingUsername,
  );

  // Change logged in user's status icon during the use of the app
  useChangeStatusIcon(user, setUser, previousStatusIcon, setPreviousStatusIcon);

  // Close chat on Esc key press
  useCloseChatWithEsc(previousPathname);

  return (
    <StyledChatPage>
      <StyledTopBar>
        <img src={STATUS_ICONS.message} alt="Message Icon" />
        <p>
          {recipient.username}
          {recipient.status_text ? ` (${recipient.status_text})` : undefined}
        </p>
        <button
          className="close-chat-btn"
          title="Close Chat"
          onClick={() => navigate(previousPathname)}
        >
          <LiaWindowCloseSolid />
        </button>
      </StyledTopBar>
      <Messages
        messages={messages}
        loggedInUser={user}
        someoneIsTyping={someoneIsTyping}
        typingUsername={typingUsername}
      />
      <Editor
        loggedInUser={user}
        recipient={recipient}
        setMessages={setMessages}
      />
    </StyledChatPage>
  );
}

export default ChatPage;
