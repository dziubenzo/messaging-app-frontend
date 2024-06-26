import PropTypes from 'prop-types';
import API_URL from '../API';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { StyledGroupChat } from '../styles/GroupChatsTab.styled';
import { FaRegTrashAlt } from 'react-icons/fa';
import { generateMembersList, statusIcons } from '../helpers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { socket } from '../socket';
import BoldToastMessage from './BoldToastMessage';
import slugify from 'slugify';

function GroupChat({ groupChat, setGroupChats }) {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { _id, name, created_by, members } = groupChat;

  // State for preventing multiple fetches from being executed
  const [inProgress, setInProgress] = useState(false);

  // Delete group chat
  async function deleteGroupChat(event) {
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
      onClick={() =>
        navigate(`/group-chats/${slugify(name, { lower: true })}`, {
          state: { groupChat },
        })
      }
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

GroupChat.propTypes = {
  groupChat: PropTypes.object,
  setGroupChats: PropTypes.func,
};

export default GroupChat;
