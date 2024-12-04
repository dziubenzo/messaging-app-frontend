import { EMOTICONS } from '../constants';
import { StyledEmoticons } from '../styles/ChatPage.styled';

type EmoticonProps = {
  insertEmoticon: (event: React.MouseEvent<HTMLImageElement>) => void;
  emoticonsContainerRef: React.RefObject<HTMLDivElement>;
};

function Emoticons({ insertEmoticon, emoticonsContainerRef }: EmoticonProps) {
  return (
    <StyledEmoticons ref={emoticonsContainerRef}>
      {EMOTICONS.map((emoticon) => (
        <img
          key={emoticon.name}
          title={emoticon.name}
          src={emoticon.url}
          onClick={insertEmoticon}
        />
      ))}
    </StyledEmoticons>
  );
}

export default Emoticons;
