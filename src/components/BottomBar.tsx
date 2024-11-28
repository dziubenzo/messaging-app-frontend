import { StyledBottomBar } from '../styles/HomePage.styled';
import type { BottomBar as BottomBarType } from '../types';

type BottomBarProps = {
  bottomBarText: BottomBarType;
};

function BottomBar({ bottomBarText }: BottomBarProps) {
  return (
    <StyledBottomBar>
      <p>ID {bottomBarText.id}</p>
      <p className="text-status">{bottomBarText.status}</p>
    </StyledBottomBar>
  );
}

export default BottomBar;
