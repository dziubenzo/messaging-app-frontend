import { StyledChatPage } from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useFetch, statusIcons } from '../helpers';
import { useEffect } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import Messages from '../components/Messages';
import Editor from '../components/Editor';
import { useEventsChatPage } from '../socket';

function ChatPage() {
  const navigate = useNavigate();

  const { user } = useOutletContext();
  const { state } = useLocation();

  // States for messages
  const [messages, setMessages] = useImmer([]);
  // State for managing chat recipient
  const [recipient, setRecipient] = useImmer(state.recipient);

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
  useEventsChatPage(recipient, setRecipient, setMessages);

  return (
    <StyledChatPage>
      <StyledTopBar>
        <img src={statusIcons.message} alt="Message Icon" />
        <p>
          {recipient.username}
          {recipient.status_text
            ? ` (${recipient.status_text.slice(0, 24)}....)`
            : undefined}
        </p>
        <LiaWindowCloseSolid
          title="Close Chat"
          onClick={() => navigate('/home')}
        />
      </StyledTopBar>
      <Messages loading={loading} messages={messages} loggedInUser={user} />
      <Editor sender={user} recipient={recipient} setMessages={setMessages} />
    </StyledChatPage>
  );
}

export default ChatPage;
