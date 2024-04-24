import PropTypes from 'prop-types';

function IsTyping({ username }) {
  return <p>{username} is typing...</p>;
}

IsTyping.propTypes = {
  username: PropTypes.string,
};

export default IsTyping;
