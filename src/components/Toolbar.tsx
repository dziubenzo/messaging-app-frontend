import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import {
  getPreviousPathname,
  useCloseChatOrEmoticons,
  useHideEmoticons,
} from '../helpers';
import { StyledToolbar } from '../styles/ChatPage.styled';
import Emoticons from './Emoticons';

type ToolbarProps = {
  inputFieldRef: React.RefObject<HTMLDivElement>;
  isGroupChat: boolean;
};

function Toolbar({ inputFieldRef, isGroupChat }: ToolbarProps) {
  const { state } = useLocation();
  const previousPathname = getPreviousPathname(state);

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

  // Close chat or emoticons container on Esc key press
  useCloseChatOrEmoticons(
    previousPathname,
    isGroupChat,
    showEmoticons,
    setShowEmoticons,
  );

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
