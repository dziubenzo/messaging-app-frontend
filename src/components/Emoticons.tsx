import { EMOTICONS } from '../constants';
import { StyledEmoticons } from '../styles/ChatPage.styled';

type EmoticonProps = {
  insertEmoticon: (event: React.MouseEvent<HTMLButtonElement>) => void;
  emoticonsContainerRef: React.RefObject<HTMLDivElement>;
};

function Emoticons({ insertEmoticon, emoticonsContainerRef }: EmoticonProps) {
  return (
    <StyledEmoticons
      ref={emoticonsContainerRef}
      onMouseDown={(event) => event.preventDefault()}
    >
      {Object.values(EMOTICONS).map((emoticon) => (
        <button
          key={emoticon.title}
          title={emoticon.title}
          onClick={insertEmoticon}
        >
          <img src={emoticon.url} />
        </button>
      ))}
    </StyledEmoticons>
  );
}

export default Emoticons;
