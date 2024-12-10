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
import { useOutletContext } from 'react-router-dom';
import DevInfo from '../components/DevInfo';
import Loading from '../components/Loading';
import { DARK_THEME, STATUS_ICONS } from '../constants';
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
  StyledContact,
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
        <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
        <p>Me (Loading...)</p>
        <button>
          <AiOutlineLogout />
        </button>
      </StyledTopBar>
      <StyledContactsBar>
        <a>
          <div>
            <LiaUsersSolid />
            <SkeletonLine text="All Users" />
          </div>
        </a>
        <a>
          <div>
            <LiaUser />
            <SkeletonLine text="Contacts" />
          </div>
        </a>
        <a>
          <div>
            <LiaUserFriendsSolid />
            <SkeletonLine text="Group Chats" />
          </div>
        </a>
        <a>
          <div>
            <LiaPlusCircleSolid />
            <SkeletonLine text="New Group Chat" />
          </div>
        </a>
      </StyledContactsBar>
      <MiddleSection>
        <SkeletonContact length={10} />
      </MiddleSection>
      <StyledBottomBar>
        <SkeletonLine text="0000000" marginBottom />
        <SkeletonLine text="Loading a long text status..." />
      </StyledBottomBar>
      <StyledStatusBar>
        <div className="status">
          <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
          <p>My status</p>
        </div>
        <DevInfo />
        <a>
          <PiDotsThreeOutlineFill />
        </a>
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

type SkeletonLineProps = {
  text: string;
  marginBottom?: boolean;
};

function SkeletonLine({ text = '', marginBottom }: SkeletonLineProps) {
  return (
    <p className={`skeleton-line ${marginBottom ? 'mg-b' : undefined}`}>
      {text}
    </p>
  );
}

type SkeletonIconProps = {
  size?: number;
  colour?: string;
  marginRight?: boolean;
};

function SkeletonIcon({
  size = 18,
  colour = DARK_THEME.colours.bgPrimary,
  marginRight,
}: SkeletonIconProps) {
  return (
    <div
      style={{ width: size, height: size, backgroundColor: colour }}
      className={`skeleton-icon ${marginRight ? 'mg-r' : undefined}`}
    ></div>
  );
}

type SkeletonContactProps = {
  length: number;
};

function SkeletonContact({ length }: SkeletonContactProps) {
  return Array(length)
    .fill(null)
    .map((_v, index) => {
      return (
        <StyledContact key={index}>
          <SkeletonIcon size={20} marginRight />
          <div className="user-info">
            <p className="username">
              <SkeletonLine text="Loading..." marginBottom />
            </p>
            <p className="text-status">
              <SkeletonLine text="Loading some text status..." />
            </p>
          </div>
        </StyledContact>
      );
    });
}
