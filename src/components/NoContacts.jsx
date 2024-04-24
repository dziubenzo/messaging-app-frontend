import PropTypes from 'prop-types';

function NoContacts({ message }) {
  return (
    <div className="no-contacts-wrapper">
      <p>{message}</p>
    </div>
  );
}

NoContacts.propTypes = {
  message: PropTypes.string,
};

export default NoContacts;
