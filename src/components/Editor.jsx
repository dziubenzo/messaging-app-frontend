import PropTypes from 'prop-types';
import {
  StyledEditor,
  StyledToolbar,
  StyledInputField,
  StyledInputButtons,
} from '../styles/ChatPage.styled';
import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { useState } from 'react';

function Editor(props) {
  const [text, setText] = useState('');

  // Bold, italicise or underline selected text in input field
  function changeSelection(action) {
    document.execCommand(action, false, null);
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
      </StyledToolbar>
      <StyledInputField
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
