import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function IsAnonymous({ children }) {
  const { isSignedIn } = useAuth();

  return !isSignedIn ? children : null;
}

IsAnonymous.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

IsAnonymous.defaultProps = {
  children: null,
};

export default IsAnonymous;
