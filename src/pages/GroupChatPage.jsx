import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { StyledGroupChatPage } from '../styles/GroupChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { statusIcons, useFetch } from '../helpers';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import Messages from '../components/Messages';
import Editor from '../components/Editor';
import { socket, useEventsGroupChatPage } from '../socket';

function GroupChatPage() {
  const navigate = useNavigate();

  const { user } = useOutletContext();
  const { state } = useLocation();

  // States for messages
  const [messages, setMessages] = useImmer([]);
  // State for group chat
  const [groupChat, setGroupChat] = useImmer(state.groupChat);

  // Fetch group chat messages
  const { data, loading, error } = useFetch(
    `/group-chats/${groupChat._id}/messages`,
  );

  // Set messages state once messages are fetched
  // Emit open group chat event
  useEffect(() => {
    if (data) {
      setMessages(data);
      socket.emit('open group chat', groupChat._id);
    }
  }, [data]);

  // Manage events emitted by the server
  useEventsGroupChatPage(groupChat, setMessages);

  return (
    <StyledGroupChatPage>
      <StyledTopBar>
        <img src={statusIcons.availableMessage} alt="Group Chat Icon" />
        <p>
          {groupChat.name} ({groupChat.members.length} members)
        </p>
        <LiaWindowCloseSolid
          title="Close Group Chat"
          onClick={() => navigate('/home/group-chats')}
        />
      </StyledTopBar>
      <Messages
        loading={loading}
        error={error}
        messages={messages}
        loggedInUser={user}
      />
      <Editor
        loggedInUser={user}
        recipient={groupChat}
        setMessages={setMessages}
        isGroupChat={true}
      />
    </StyledGroupChatPage>
  );
}

export default GroupChatPage;