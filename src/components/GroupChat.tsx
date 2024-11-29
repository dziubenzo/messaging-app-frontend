import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import type { Updater } from 'use-immer';
import API_URL from '../API';
import { generateMembersList, statusIcons } from '../helpers';
import { socket } from '../socket';
import { StyledGroupChat } from '../styles/GroupChatsTab.styled';
import type { OutletContext, GroupChat } from '../types';
import BoldToastMessage from './BoldToastMessage';

type GroupChatProps = {
  groupChat: GroupChat;
  setGroupChats: Updater<GroupChat[]>;
};

function GroupChat({ groupChat, setGroupChats }: GroupChatProps) {
  const navigate = useNavigate();
  const { user } = useOutletContext<OutletContext>();
  const { _id, name, created_by, members } = groupChat;

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);

  // Delete group chat
  async function deleteGroupChat(event: React.MouseEvent<SVGElement>) {
    if (inProgress) {
      return;
    }
    const toastRef = toast.info('Deleting group chat...');
    event.stopPropagation();
    setInProgress(true);
    const res = await fetch(`${API_URL}/group-chats/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
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
      <img src={statusIcons.availableMessage} alt={'Group Chat Icon'} />
      <div className="group-chat-info">
        <p className="group-chat-name">{name}</p>
        <p className="group-chat-members">
          {name === 'General'
            ? `(${members.length}) - All Users`
            : `(${members.length}) - Me, ${generateMembersList(members, user.username)}`}
        </p>
      </div>
      {created_by === user._id && (
        <FaRegTrashAlt title="Delete Group Chat" onClick={deleteGroupChat} />
      )}
    </StyledGroupChat>
  );
}

export default GroupChat;
