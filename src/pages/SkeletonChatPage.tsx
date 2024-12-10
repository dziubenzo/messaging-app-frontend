import { FaBold, FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { LiaWindowCloseSolid } from 'react-icons/lia';
import { MdInsertEmoticon } from 'react-icons/md';
import { useOutletContext } from 'react-router-dom';
import Loading from '../components/Loading';
import { STATUS_ICONS } from '../constants';
import {
  StyledChatPage,
  StyledEditor,
  StyledInputButtons,
  StyledInputField,
  StyledMessages,
  StyledToolbar,
} from '../styles/ChatPage.styled';
import { StyledTopBar } from '../styles/HomePage.styled';
import { OutletContext } from '../types';
import LoadingPage from './LoadingPage';

export default function SkeletonChatPage() {
  const { isAuth } = useOutletContext<OutletContext>();

  return !isAuth ? (
    <LoadingPage />
  ) : (
    <StyledChatPage>
      <StyledTopBar>
        <img src={STATUS_ICONS.invisible} />
        <p>Loading...</p>
        <button className="close-chat-btn">
          <LiaWindowCloseSolid />
        </button>
      </StyledTopBar>
      <StyledMessages>
        <Loading />
      </StyledMessages>
      <StyledEditor>
        <StyledToolbar>
          <button className="toolbar-btn">
            <FaBold />
          </button>
          <button className="toolbar-btn">
            <FaItalic />
          </button>
          <button className="toolbar-btn">
            <FaUnderline />
          </button>
          <button className="toolbar-btn">
            <MdInsertEmoticon />
          </button>
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
