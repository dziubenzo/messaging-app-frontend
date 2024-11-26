import { StyledEmoticons } from '../styles/ChatPage.styled';

type EmoticonProps = {
  insertEmoticon: (event: React.MouseEvent<HTMLImageElement>) => void;
};

function Emoticons({ insertEmoticon }: EmoticonProps) {
  return (
    <StyledEmoticons>
      <img
        src="http://emots.yetihehe.com/2/usmiech.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/zeby.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/oczko.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/jezyk1.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/chytry.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/3/krzywy.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/3/kwasny.gif"
        onClick={insertEmoticon}
      />
      <img src="http://emots.yetihehe.com/3/lol.gif" onClick={insertEmoticon} />
      <img
        src="http://emots.yetihehe.com/3/rotfl.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/3/serduszka.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/3m_sie.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/jupi.gif"
        onClick={insertEmoticon}
      />
      <img src="http://emots.yetihehe.com/3/wow.gif" onClick={insertEmoticon} />
      <img
        src="http://emots.yetihehe.com/2/pytajnik.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/wykrzyknik.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/sciana.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/pisze.gif"
        onClick={insertEmoticon}
      />
      <img src="http://emots.yetihehe.com/3/sex.gif" onClick={insertEmoticon} />
      <img
        src="http://emots.yetihehe.com/2/przytul.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/3/tuptup.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/tancze.gif"
        onClick={insertEmoticon}
      />
      <img
        src="http://emots.yetihehe.com/2/piwo.gif"
        onClick={insertEmoticon}
      />
    </StyledEmoticons>
  );
}

export default Emoticons;
