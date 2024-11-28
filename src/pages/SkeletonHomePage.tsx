import { AiOutlineLogout } from 'react-icons/ai';
import {
  LiaPlusCircleSolid,
  LiaUser,
  LiaUserFriendsSolid,
  LiaUsersSolid,
} from 'react-icons/lia';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import { statusIcons } from '../helpers';
import {
  MiddleSection,
  StyledBottomBar,
  StyledContactsBar,
  StyledHomePage,
  StyledStatusBar,
  StyledTopBar,
} from '../styles/HomePage.styled';

export default function SkeletonHomePage() {
  return (
    <StyledHomePage>
      <StyledTopBar>
        <img src={statusIcons.invisible} alt="Status Icon" />
        <p>Loading...</p>
        <AiOutlineLogout title="Log Out" />
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
        <div className="status" title="Change Your Status Icon">
          <img src={statusIcons.invisible} alt="Status Icon" />
          <p>My status</p>
          <div className="statuses-drop-down">
            <div>
              <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </div>
            <div>
              <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </div>
            <div>
              <img src={statusIcons.invisible} alt="Status Icon - Invisible" />
              <p>Loading...</p>
            </div>
          </div>
        </div>
        <NavLink to={'/'}>
          <PiDotsThreeOutlineFill />
        </NavLink>
      </StyledStatusBar>
    </StyledHomePage>
  );
}
