import { AiOutlineLogout } from 'react-icons/ai';
import {
  LiaPlusCircleSolid,
  LiaUser,
  LiaUserFriendsSolid,
  LiaUsersSolid,
} from 'react-icons/lia';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { NavLink, useOutletContext } from 'react-router-dom';
import DevInfo from '../components/DevInfo';
import Loading from '../components/Loading';
import { STATUS_ICONS } from '../constants';
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

export default function SkeletonHomePage() {
  const { isAuth } = useOutletContext<OutletContext>();

  return !isAuth ? (
    <LoadingPage />
  ) : (
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
