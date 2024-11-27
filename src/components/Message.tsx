import { format } from 'date-fns';
import parse from 'html-react-parser';
import { StyledMessage } from '../styles/ChatPage.styled';
import type { GroupChatMessage, Message as MessageType, User } from '../types';

type MessageProps = {
  message: MessageType | GroupChatMessage;
  loggedInUser: User;
};

function Message({ message, loggedInUser }: MessageProps) {
  const isSender = message.sender._id === loggedInUser._id;

  return (
    <StyledMessage sender={isSender ? 'true' : undefined}>
      <p className="sender">
        {isSender ? 'Me' : message.sender.username}
        <span className="date" title={format(message.date, 'd MMMM y')}>
          {' (' + format(message.date, 'HH:mm') + ')'}
        </span>
      </p>
      <p className="message">{parse(message.text)}</p>
    </StyledMessage>
  );
}

export default Message;
