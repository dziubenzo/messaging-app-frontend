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
    isClosing,
    setIsClosing,
    emoticonsContainerRef,
    emoticonsButtonRef,
  } = useHideEmoticons();

  // Bold, italicise or underline selected text in input field
  function changeSelection(action: 'bold' | 'italic' | 'underline') {
    document.execCommand(action, false, undefined);
  }

  // Insert emoticon at the end of the input field if it is empty or where the caret is if it is not
  function insertEmoticon(event: React.MouseEvent<HTMLButtonElement>) {
    if (!inputFieldRef.current) return;
    inputFieldRef.current.focus();
    document.execCommand(
      'insertImage',
      false,
      event.currentTarget.firstElementChild instanceof HTMLImageElement
        ? event.currentTarget.firstElementChild.src
        : undefined,
    );
  }

  // Close the emoticons div after the animation has ended
  function handleEmoticonsAnimationEnd() {
    // Prevent the code from running on opening animation
    if (!isClosing) return;
    setShowEmoticons(false);
    setIsClosing(false);
  }

  // Close chat or emoticons container on Esc key press
  useCloseChatOrEmoticons(
    previousPathname,
    isGroupChat,
    showEmoticons,
    setIsClosing,
  );

  return (
    <StyledToolbar onMouseDown={(event) => event.preventDefault()}>
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
            isClosing={isClosing}
            handleEmoticonsAnimationEnd={handleEmoticonsAnimationEnd}
          />
        )}
      </div>
    </StyledToolbar>
  );
}

export default Toolbar;
