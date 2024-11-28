import { useEffect, useState } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useLoaderData, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Editor from '../components/Editor';
import Messages from '../components/Messages';
import { statusIcons, useChangeStatusIcon, useFetch } from '../helpers';
import { socket, useEventsGroupChatPage } from '../socket';
import { StyledGroupChatPage } from '../styles/GroupChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import type { GroupChat, GroupChatMessage, OutletContext, User } from '../types';

function GroupChatPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { previousStatusIcon, setPreviousStatusIcon } =
    useOutletContext<OutletContext>();

  const fetchedUser = useLoaderData();
  const [user, setUser] = useImmer<User>(fetchedUser as User);

  // States for messages
  const [messages, setMessages] = useImmer<GroupChatMessage[]>([]);
  // State for group chat
  const [groupChat] = useImmer<GroupChat>(state.groupChat);

  // States for managing is typing indicator
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');

  // Fetch group chat messages
  const { data, loading, error } = useFetch<GroupChatMessage[]>(
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
  useEventsGroupChatPage(
    groupChat,
    setMessages,
    setSomeoneIsTyping,
    setTypingUsername,
  );

  // Change logged in user's status icon during the use of the app
  useChangeStatusIcon(user, setUser, previousStatusIcon, setPreviousStatusIcon);

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
        someoneIsTyping={someoneIsTyping}
        typingUsername={typingUsername}
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
