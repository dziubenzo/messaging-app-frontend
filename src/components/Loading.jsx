import { BarLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="loading-wrapper">
      <BarLoader color="#ff7f3f" size={30} />
    </div>
  );
}

export default Loading;
