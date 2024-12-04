import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { useHideEmoticons } from '../helpers';
import { StyledToolbar } from '../styles/ChatPage.styled';
import Emoticons from './Emoticons';

type ToolbarProps = {
  inputFieldRef: React.RefObject<HTMLDivElement>;
};

function Toolbar({ inputFieldRef }: ToolbarProps) {
  // Hide emoticons container on outside click if it is open
  const {
    showEmoticons,
    setShowEmoticons,
    emoticonsContainerRef,
    emoticonsButtonRef,
  } = useHideEmoticons();

  // Bold, italicise or underline selected text in input field
  function changeSelection(action: 'bold' | 'italic' | 'underline') {
    document.execCommand(action, false, undefined);
  }

  // Add emoticon to the end of input field
  // Move caret to the end of input field
  function insertEmoticon(event: React.MouseEvent<HTMLImageElement>) {
    if (!inputFieldRef.current) return;
    const selection = window.getSelection();
    if (!selection) return;
    selection.selectAllChildren(inputFieldRef.current);
    selection.collapseToEnd();
    document.execCommand('insertImage', false, event.currentTarget.src);
  }

  return (
    <StyledToolbar>
      <FaBold
        title="Bold Selection"
        onMouseDown={() => changeSelection('bold')}
      />
      <FaItalic
        title="Italicise Selection"
        onMouseDown={() => changeSelection('italic')}
      />
      <FaUnderline
        title="Underline Selection"
        onMouseDown={() => changeSelection('underline')}
      />
      <div
        ref={emoticonsButtonRef}
        className="emoticons-wrapper"
        onClick={() => setShowEmoticons(true)}
      >
        <MdInsertEmoticon title="Emoticons" />
        {showEmoticons && (
          <Emoticons
            emoticonsContainerRef={emoticonsContainerRef}
            insertEmoticon={insertEmoticon}
          />
        )}
      </div>
    </StyledToolbar>
  );
}

export default Toolbar;
