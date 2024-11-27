import { useState } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { StyledToolbar } from '../styles/ChatPage.styled';
import Emoticons from './Emoticons';

type ToolbarProps = {
  inputFieldRef: React.RefObject<HTMLDivElement>;
};

function Toolbar({ inputFieldRef }: ToolbarProps) {
  // State for showing/hiding emoticons
  const [showEmoticons, setShowEmoticons] = useState(false);

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
    setShowEmoticons(false);
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
      <div className="emoticons-wrapper">
        <MdInsertEmoticon
          title="Emoticons"
          onClick={() => setShowEmoticons(!showEmoticons)}
        />
        {showEmoticons && <Emoticons insertEmoticon={insertEmoticon} />}
      </div>
    </StyledToolbar>
  );
}

export default Toolbar;
