import { AiOutlineLogout } from 'react-icons/ai';
import {
  LiaPlusCircleSolid,
  LiaUser,
  LiaUserFriendsSolid,
  LiaUsersSolid,
  LiaWindowCloseSolid,
} from 'react-icons/lia';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { useOutletContext } from 'react-router-dom';
import DevInfo from '../components/DevInfo';
import { DARK_THEME } from '../constants';
import {
  StyledChatPage,
  StyledEditor,
  StyledInputButtons,
  StyledInputField,
  StyledMessage,
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
        <SkeletonContacts length={10} />
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
        <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
        <p>Loading...</p>
        <button className="close-chat-btn">
          <LiaWindowCloseSolid />
        </button>
      </StyledTopBar>
      <StyledMessages>
        <div>
          <SkeletonMessages length={5} />
        </div>
      </StyledMessages>
      <StyledEditor>
        <StyledToolbar>
          <button className="toolbar-btn">
            <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
          </button>
          <button className="toolbar-btn">
            <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
          </button>
          <button className="toolbar-btn">
            <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
          </button>
          <button className="toolbar-btn">
            <SkeletonIcon colour={DARK_THEME.colours.bgSecondary} />
          </button>
        </StyledToolbar>
        <StyledInputField></StyledInputField>
        <StyledInputButtons>
          <button>
            <SkeletonLine text="Send" />
          </button>
          <button>
            <SkeletonLine text="Clear" />
          </button>
          <button>
            <SkeletonLine text="Close" />
          </button>
        </StyledInputButtons>
      </StyledEditor>
    </StyledChatPage>
  );
}

type SkeletonLineProps = {
  text: string;
  marginBottom?: boolean;
  className?: string;
};

function SkeletonLine({
  text = '',
  marginBottom,
  className,
}: SkeletonLineProps) {
  return (
    <p
      className={`${className} skeleton-line ${marginBottom ? 'mg-b' : undefined}`}
    >
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

type SkeletonContactsProps = {
  length: number;
};

function SkeletonContacts({ length }: SkeletonContactsProps) {
  return Array(length)
    .fill(null)
    .map((_v, index) => {
      return (
        <StyledContact key={index}>
          <SkeletonIcon size={20} marginRight />
          <div className="user-info">
            <SkeletonLine text="Loading..." marginBottom />
            <SkeletonLine
              className="text-status"
              text="Loading some text status..."
            />
          </div>
        </StyledContact>
      );
    });
}

type SkeletonMessagesProps = {
  length: number;
};

function SkeletonMessages({ length }: SkeletonMessagesProps) {
  return Array(length)
    .fill(null)
    .map((_v, index) => {
      return (
        <StyledMessage
          sender={index % 2 === 0 ? undefined : 'true'}
          key={index}
        >
          <SkeletonLine text="Loading..." marginBottom />
          <SkeletonLine
            text="Loading a rather longish message, yay!"
            marginBottom
          />
        </StyledMessage>
      );
    });
}
