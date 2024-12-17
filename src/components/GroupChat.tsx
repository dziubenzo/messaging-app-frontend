import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import API_URL from '../API';
import { STATUS_ICONS } from '../constants';
import { buildHeader, generateMembersList } from '../helpers';
import { socket } from '../socket';
import { StyledGroupChat } from '../styles/GroupChatsTab.styled';
import type { GroupChat, OutletContext } from '../types';
import BoldToastMessage from './BoldToastMessage';

type GroupChatProps = {
  groupChat: GroupChat;
};

function GroupChat({ groupChat }: GroupChatProps) {
  const navigate = useNavigate();
  const { user, setGroupChats } = useOutletContext<OutletContext>();
  const { _id, name, created_by, members } = groupChat;

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);

  // Delete group chat
  async function deleteGroupChat(event: React.MouseEvent<HTMLButtonElement>) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Deleting group chat...');
    event.stopPropagation();
    setInProgress(true);
    const res = await fetch(
      `${API_URL}/group-chats/${_id}`,
      buildHeader('DELETE'),
    );
    if (!res.ok) {
      const error = await res.json();
      return toast.update(toastRef, { render: error, type: 'error' });
    }
    setGroupChats((draft) => {
      return draft.filter((groupChat) => groupChat._id !== _id);
    });
    setInProgress(false);
    socket.emit('delete group chat', groupChat);
    return toast.update(toastRef, {
      render: <BoldToastMessage bold={name} text="deleted successfully" />,
      type: 'success',
    });
  }

  return (
    <StyledGroupChat
      onClick={() => navigate(`/group-chats/${slugify(name, { lower: true })}`)}
      title={`Click to chat in ${name}`}
    >
      <img src={STATUS_ICONS.availableMessage} alt={'Group Chat Icon'} />
      <div className="group-chat-info">
        <p className="group-chat-name">{name}</p>
        <p className="group-chat-members">
          {name === 'General'
            ? `(${members.length}) - All Users`
            : `(${members.length}) - Me, ${generateMembersList(members, user.username)}`}
        </p>
      </div>
      {inProgress && created_by === user._id ? (
        <PulseLoader className="in-progress-spinner" size={5} />
      ) : created_by === user._id ? (
        <button
          title="Delete Group Chat"
          className="delete-group-chat-btn"
          onClick={deleteGroupChat}
        >
          <FaRegTrashAlt />
        </button>
      ) : undefined}
    </StyledGroupChat>
  );
}

export default GroupChat;
