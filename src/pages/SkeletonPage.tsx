import { AiOutlineLogout } from 'react-icons/ai';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import {
  LiaPlusCircleSolid,
  LiaUser,
  LiaUserFriendsSolid,
  LiaUsersSolid,
  LiaWindowCloseSolid,
} from 'react-icons/lia';
import { MdInsertEmoticon } from 'react-icons/md';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { NavLink, useOutletContext } from 'react-router-dom';
import DevInfo from '../components/DevInfo';
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
import {
  MiddleSection,
  StyledBottomBar,
  StyledContactsBar,
  StyledHomePage,
  StyledStatusBar,
  StyledTopBar,
} from '../styles/HomePage.styled';
import { OutletContext } from '../types';
import LoadingPage from './LoadingPage';

type SkeletonPageProps = {
  type: 'home' | 'chat';
};

export default function SkeletonPage({ type }: SkeletonPageProps) {
  const { isAuth } = useOutletContext<OutletContext>();
  return !isAuth ? (
    <LoadingPage />
  ) : type === 'home' ? (
    <SkeletonHomePage />
  ) : (
    <SkeletonChatPage />
  );
}

function SkeletonHomePage() {
  return (
    <StyledHomePage>
      <StyledTopBar>
        <img src={STATUS_ICONS.invisible} alt="Status Icon" />
        <p>Loading...</p>
        <button>
          <AiOutlineLogout />
        </button>
      </StyledTopBar>
      <StyledContactsBar>
        <a>
          <div>
            <LiaUsersSolid />
            <p>Loading...</p>
          </div>
        </a>
        <a>
          <div>
            <LiaUser />
            <p>Loading...</p>
          </div>
        </a>
        <a>
          <div>
            <LiaUserFriendsSolid />
            <p>Loading...</p>
          </div>
        </a>
        <a>
          <div>
            <LiaPlusCircleSolid />
            <p>Loading..........</p>
          </div>
        </a>
      </StyledContactsBar>
      <MiddleSection>
        <Loading />
      </MiddleSection>
      <StyledBottomBar>
        <p>Loading...</p>
        <p className="text-status">Loading...</p>
      </StyledBottomBar>
      <StyledStatusBar>
        <div className="status">
          <img src={STATUS_ICONS.invisible} alt="Status Icon" />
          <p>My status</p>
          <div className="statuses-drop-down">
            <button>
              <img src={STATUS_ICONS.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </button>
            <button>
              <img src={STATUS_ICONS.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </button>
            <button>
              <img src={STATUS_ICONS.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </button>
          </div>
        </div>
        <DevInfo />
        <NavLink to={'/'}>
          <PiDotsThreeOutlineFill />
        </NavLink>
      </StyledStatusBar>
    </StyledHomePage>
  );
}

function SkeletonChatPage() {
  return (
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
