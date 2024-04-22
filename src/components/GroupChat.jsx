import PropTypes from 'prop-types';
import API_URL from '../API';
import { useOutletContext } from 'react-router-dom';
import { StyledGroupChat } from '../styles/GroupChatsTab.styled';
import { FaRegTrashAlt } from 'react-icons/fa';
import { statusIcons } from '../helpers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { socket } from '../socket';

function GroupChat({ groupChat, setGroupChats }) {
  const { user } = useOutletContext();
  const { _id, name, created_by, members } = groupChat;

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);

  // Delete group chat
  async function deleteGroupChat(event) {
    if (inProgress) {
      return;
    }
    toast.info('Deleting group chat...');
    event.stopPropagation();
    setInProgress(true);
    const res = await fetch(`${API_URL}/group-chats/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) {
      const error = await res.json();
      return toast.error(error);
    }
    const successMessage = await res.json();
    setGroupChats((draft) => {
      return draft.filter((groupChat) => groupChat._id !== _id);
    });
    setInProgress(false);
    socket.emit('delete group chat', groupChat);
    return toast.success(successMessage);
  }

  return (
    <StyledGroupChat>
      <img
        src={statusIcons.availableMessage}
        alt={'Status Icon - Group Chat'}
      />
      <div className="group-chat-info">
        <p className="group-chat-name">{name}</p>
        <p className="group-chat-members">
          {`(${members.length}) - Me, `}
          {members.map((member, index) => {
            return member.user_id === user.user_id
              ? ''
              : index === members.length - 2
                ? member.username
                : index === members.length - 1
                  ? ', ' + member.username
                  : member.username + ', ';
          })}
        </p>
      </div>
      {created_by === user._id && <FaRegTrashAlt onClick={deleteGroupChat} />}
    </StyledGroupChat>
  );
}

GroupChat.propTypes = {
  groupChat: PropTypes.object,
  setGroupChats: PropTypes.func,
};

export default GroupChat;
