import { StyledLoadingPage } from '../styles/LoadingPage.styled';

function LoadingPage() {
  return (
    <StyledLoadingPage>
      <img
        src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712917635/messaging_app/ryk3km39qhsbztiw6kmg.png"
        alt="Loading Image"
      />
      <h2>Loading...</h2>
    </StyledLoadingPage>
  );
}

export default LoadingPage;
