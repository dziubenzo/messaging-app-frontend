import { BarLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="loading-wrapper">
      <BarLoader color="#ff7f3f" height={5} width={200} />
    </div>
  );
}

export default Loading;
