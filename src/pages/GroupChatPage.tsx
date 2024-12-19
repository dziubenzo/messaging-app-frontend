import { useEffect, useState } from 'react';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Editor from '../components/Editor';
import Messages from '../components/Messages';
import { STATUS_ICONS } from '../constants';
import { useUser } from '../helpers';
import { socket, useEventsGroupChatPage } from '../socket';
import { StyledGroupChatPage } from '../styles/GroupChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import type {
  GroupChat,
  GroupChatMessage
} from '../types';

function GroupChatPage() {
  const navigate = useNavigate();

  const { user, groupChat: fetchedGroupChat } = useUser();

  // States for messages
  const [messages, setMessages] = useImmer<GroupChatMessage[]>(
    fetchedGroupChat!.messages,
  );
  // State for group chat
  const [groupChat] = useImmer<GroupChat>(fetchedGroupChat!);

  // States for managing is typing indicator
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);
  const [typingUsername, setTypingUsername] = useState('');

  // Emit open group chat event
  useEffect(() => {
    if (fetchedGroupChat) {
      socket.emit('open group chat', groupChat._id);
    }
  }, [fetchedGroupChat, groupChat._id]);

  // Manage events emitted by the server
  useEventsGroupChatPage(
    groupChat,
    setMessages,
    setSomeoneIsTyping,
    setTypingUsername,
  );

  return (
    <StyledGroupChatPage>
      <StyledTopBar>
        <img src={STATUS_ICONS.availableMessage} alt="Group Chat Icon" />
        <p>
          {groupChat.name} ({groupChat.members.length} members)
        </p>
        <button
          className="close-chat-btn"
          title="Close Group Chat"
          onClick={() => navigate('/home/group-chats')}
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
        recipient={groupChat}
        setMessages={setMessages}
        isGroupChat={true}
      />
    </StyledGroupChatPage>
  );
}

export default GroupChatPage;
