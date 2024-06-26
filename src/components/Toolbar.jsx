import PropTypes from 'prop-types';
import { StyledToolbar } from '../styles/ChatPage.styled';
import Emoticons from './Emoticons';
import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { useState } from 'react';

function Toolbar({ inputFieldRef }) {
  // State for showing/hiding emoticons
  const [showEmoticons, setShowEmoticons] = useState(false);

  // Bold, italicise or underline selected text in input field
  function changeSelection(action) {
    document.execCommand(action, false, null);
  }

  // Add emoticon to the end of input field
  // Move caret to the end of input field
  function insertEmoticon(event) {
    const selection = window.getSelection();
    selection.selectAllChildren(inputFieldRef.current);
    selection.collapseToEnd();
    document.execCommand('insertImage', false, event.target.src);
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

Toolbar.propTypes = {
  inputFieldRef: PropTypes.object,
};

export default Toolbar;
