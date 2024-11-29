import { useState } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Editor from '../components/Editor';
import Messages from '../components/Messages';
import { statusIcons, useChangeStatusIcon, useUser } from '../helpers';
import { useEventsChatPage } from '../socket';
import { StyledChatPage } from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { Message, OutletContext, User } from '../types';

function ChatPage() {
  const navigate = useNavigate();
  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();

  const {
    user: fetchedUser,
    recipient: fetchedRecipient,
    messages: fetchedMessages,
  } = useUser();

  const [user, setUser] = useImmer<User>(fetchedUser);

  // States for messages
  const [messages, setMessages] = useImmer<Message[]>(
    fetchedMessages as Message[],
  );
  // State for managing chat recipient
  const [recipient, setRecipient] = useImmer<User>(fetchedRecipient as User);

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

  return (
    <StyledChatPage>
      <StyledTopBar>
        <img src={statusIcons.message} alt="Message Icon" />
        <p>
          {recipient.username}
          {recipient.status_text ? ` (${recipient.status_text})` : undefined}
        </p>
        <LiaWindowCloseSolid
          title="Close Chat"
          onClick={() => navigate('/home')}
        />
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
