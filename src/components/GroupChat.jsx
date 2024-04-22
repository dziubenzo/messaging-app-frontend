import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { StyledGroupChat } from '../styles/GroupChatsTab.styled';
import { FaRegTrashAlt } from 'react-icons/fa';
import { statusIcons } from '../helpers';

function GroupChat({ groupChat }) {
  const { user } = useOutletContext();
  const { name, created_by, members } = groupChat;

  return (
    <StyledGroupChat>
      <img
        src={statusIcons.availableMessage}
        alt={'Status Icon - Group Chat'}
      />
      <div className="group-chat-info">
        <p className="group-chat-name">{name}</p>
        <p className="group-chat-members">
          {`(${members.length}) - `}
          {members.map((member, index) => {
            return index === members.length - 1
              ? member.username
              : member.username + ', ';
          })}
        </p>
      </div>
      {created_by === user._id && <FaRegTrashAlt />}
    </StyledGroupChat>
  );
}

GroupChat.propTypes = {
  groupChat: PropTypes.object,
};

export default GroupChat;
