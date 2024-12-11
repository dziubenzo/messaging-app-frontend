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
      {EMOTICONS.map((emoticon) => (
        <button
          key={emoticon.name}
          title={emoticon.name}
          onClick={insertEmoticon}
        >
          <img src={emoticon.url} />
        </button>
      ))}
    </StyledEmoticons>
  );
}

export default Emoticons;
