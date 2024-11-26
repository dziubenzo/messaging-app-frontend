import { BarLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="loading-wrapper">
      <BarLoader color="#ff7f3f" height={30} width={30} />
    </div>
  );
}

export default Loading;
