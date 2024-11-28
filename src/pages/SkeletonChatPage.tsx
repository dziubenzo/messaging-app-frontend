import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { MdInsertEmoticon } from 'react-icons/md';
import Loading from '../components/Loading';
import { statusIcons } from '../helpers';
import {
  StyledChatPage,
  StyledEditor,
  StyledInputButtons,
  StyledInputField,
  StyledMessages,
  StyledToolbar,
} from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';

export default function SkeletonChatPage() {
  return (
    <StyledChatPage>
      <StyledTopBar>
        <img src={statusIcons.invisible} />
        <p>Loading...</p>
        <LiaWindowCloseSolid />
      </StyledTopBar>
      <StyledMessages>
        <Loading />
      </StyledMessages>
      <StyledEditor>
        <StyledToolbar>
          <FaBold />
          <FaItalic />
          <FaUnderline />
          <div className="emoticons-wrapper">
            <MdInsertEmoticon />
          </div>
        </StyledToolbar>
        <StyledInputField></StyledInputField>
        <StyledInputButtons>
          <button>Send</button>
          <button>Clear</button>
          <button>Close</button>
        </StyledInputButtons>
      </StyledEditor>
    </StyledChatPage>
  );
}
