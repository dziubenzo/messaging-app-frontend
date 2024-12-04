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
  function insertEmoticon(event: React.MouseEvent<HTMLButtonElement>) {
    if (!inputFieldRef.current) return;
    const selection = window.getSelection();
    if (!selection) return;
    selection.selectAllChildren(inputFieldRef.current);
    selection.collapseToEnd();
    document.execCommand(
      'insertImage',
      false,
      event.currentTarget.firstElementChild instanceof HTMLImageElement
        ? event.currentTarget.firstElementChild.src
        : undefined,
    );
  }

  return (
    <StyledToolbar>
      <button
        className="toolbar-btn"
        title="Bold Selection"
        onMouseDown={() => changeSelection('bold')}
      >
        <FaBold />
      </button>
      <button
        className="toolbar-btn"
        title="Italicise Selection"
        onMouseDown={() => changeSelection('italic')}
      >
        <FaItalic />
      </button>
      <button
        className="toolbar-btn"
        title="Underline Selection"
        onMouseDown={() => changeSelection('underline')}
      >
        <FaUnderline />
      </button>
      <div className="emoticon-btn-wrapper">
        <button
          ref={emoticonsButtonRef}
          className="toolbar-btn"
          title="Show Emoticons"
          onClick={() => setShowEmoticons(true)}
        >
          <MdInsertEmoticon />
        </button>
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
