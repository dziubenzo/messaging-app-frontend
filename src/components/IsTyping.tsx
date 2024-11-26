import { StyledIsTyping } from '../styles/ChatPage.styled';
import { User } from '../types';

type IsTypingProps = {
  username: User['username'];
};

function IsTyping({ username }: IsTypingProps) {
  return (
    <StyledIsTyping>
      <span>{username}</span> is typing...
    </StyledIsTyping>
  );
}

export default IsTyping;
