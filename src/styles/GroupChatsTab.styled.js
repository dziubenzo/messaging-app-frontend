import styled from 'styled-components';
import { StyledContact } from './HomePage.styled';

export const StyledGroupChat = styled(StyledContact)`
  .group-chat-info {
    max-width: 80%;

    .group-chat-name {
      font-size: ${(props) => props.theme.fontSizes.standard};
      font-weight: 800;
    }

    .group-chat-members {
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }

  @media (hover: hover) {
    &:hover {
      svg {
        fill: white;
      }
    }
  }
`;
