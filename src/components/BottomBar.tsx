import { StyledBottomBar } from '../styles/HomePage.styled';
import type { BottomBar } from '../types';

type BottomBarProps = {
  bottomBarText: BottomBar;
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
