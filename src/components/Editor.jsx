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

  return (
    <StyledEditor>
      <StyledToolbar>
        <FaBold title="Bold Selection" />
        <FaItalic title="Italicise Selection" />
        <FaUnderline title="Underline Selection" />
      </StyledToolbar>
      <StyledInputField
        contentEditable
        onInput={(event) => setText(event.currentTarget.textContent)}
      ></StyledInputField>
      <StyledInputButtons>
        <button type="text">Send</button>
        <button type="text">Clear</button>
        <button type="text" className='close-btn'>Close</button>
      </StyledInputButtons>
    </StyledEditor>
  );
}

Editor.propTypes = {};

export default Editor;
