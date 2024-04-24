import PropTypes from 'prop-types';

function BoldToastMessage({ bold, text }) {
  return (
    <p>
      <span className="bold">{bold + ' '}</span>
      {text}
    </p>
  );
}

BoldToastMessage.propTypes = {
  bold: PropTypes.string,
  text: PropTypes.string,
};

export default BoldToastMessage;
