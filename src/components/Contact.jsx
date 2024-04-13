import PropTypes from 'prop-types';
import { StyledContact } from '../styles/HomePage.styled';

function Contact({ user }) {
  const { username, status_icon } = user;

  return (
    <StyledContact>
      <img src={status_icon} alt={`Status Icon - ${username}`} />
      <div className='user-info'>
        <p className='username'>{username}</p>
        <p className='text-status'>Some future status</p>
      </div>
    </StyledContact>
  );
}
Contact.propTypes = {
  user: PropTypes.object,
};

export default Contact;
