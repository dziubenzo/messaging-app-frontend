import PropTypes from 'prop-types';
import {
  StyledEditor,
  StyledToolbar,
  StyledInputField,
  StyledInputButtons,
} from '../styles/ChatPage.styled';
import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { MdInsertEmoticon } from 'react-icons/md';
import { useRef, useState } from 'react';
import Emoticons from './Emoticons';

function Editor(props) {
  const inputFieldRef = useRef(null);

  // States for grabbing user chat message and showing/hiding emoticons
  const [text, setText] = useState('');
  const [showEmoticons, setShowEmoticons] = useState(false);

  // Bold, italicise or underline selected text in input field
  function changeSelection(action) {
    document.execCommand(action, false, null);
  }

  // Add emoticon to the end of the input field
  function insertEmoticon(event) {
    // Move caret to the end of the input field
    const selection = window.getSelection();
    selection.selectAllChildren(inputFieldRef.current);
    selection.collapseToEnd();
    document.execCommand('insertImage', false, event.target.src);
    setShowEmoticons(false);
  }

  return (
    <StyledEditor>
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
      <StyledInputField
        ref={inputFieldRef}
        contentEditable
        onInput={(event) => {
          setText(event.currentTarget.innerHTML);
        }}
      ></StyledInputField>
      <StyledInputButtons>
        <button>Send</button>
        <button>Clear</button>
        <button>Close</button>
      </StyledInputButtons>
    </StyledEditor>
  );
}

Editor.propTypes = {};

export default Editor;
