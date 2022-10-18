import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function IsUser({ children }) {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : null;
}

IsUser.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

IsUser.defaultProps = {
  children: null,
};

export default IsUser;
