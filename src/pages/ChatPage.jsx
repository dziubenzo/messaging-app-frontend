import { StyledChatPage } from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useChangeStatusIcon, useFetch, statusIcons } from '../helpers';
import { useState, useEffect } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import Messages from '../components/Messages';
import Editor from '../components/Editor';
import { useEventsChatPage } from '../socket';

function ChatPage() {
  const navigate = useNavigate();

  const { user, setUser, previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext();
  const { state } = useLocation();

  // States for messages
  const [messages, setMessages] = useImmer([]);
  // State for managing chat recipient
  const [recipient, setRecipient] = useImmer(state.recipient);

  // States for managing is typing indicator
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');

  // Fetch messages
  const { data, loading, error } = useFetch(
    `/messages/?from=${user._id}&to=${recipient._id}`,
  );

  // Set messages state when data fetched
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

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
        loading={loading}
        error={error}
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
