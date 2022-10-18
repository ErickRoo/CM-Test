import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import classNames from 'classnames';
import * as Styles from './button.module.scss';

function Button({ type, theme, action, className, size, children, onClick, width, style }) {
  const widthClass = width ? width.charAt(0).toUpperCase() + width.slice(1) : null;
  const elementClasses = classNames(Styles.root, Styles[theme], Styles[size], Styles[`width${widthClass}`], className);

  if (type === 'link') {
    return (
      <Link to={action} className={elementClasses} onClick={onClick} style={style}>
        <span className={Styles.inner}>{children}</span>
      </Link>
    );
  }

  if (type === 'href') {
    return (
      <a href={action} className={elementClasses} onClick={onClick} style={style}>
        <span className={Styles.inner}>{children}</span>
      </a>
    );
  }

  if (type === 'button') {
    return (
      <button
        type="button"
        onClick={() => {
          action();
          onClick();
        }}
        className={elementClasses}
        style={style}
      >
        <span className={Styles.inner}>{children}</span>
      </button>
    );
  }

  if (type === 'submit') {
    return (
      <button type="submit" className={elementClasses} style={style}>
        <span className={Styles.inner}>{children}</span>
      </button>
    );
  }

  if (type === 'div') {
    return (
      <div className={elementClasses}  style={style}>
        <span className={Styles.inner}>{children}</span>
      </div>
    );
  }

  return null;
}

Button.propTypes = {
  type: PropTypes.oneOf(['link', 'href', 'button', 'div', 'submit']).isRequired,
  theme: PropTypes.oneOf(['green', 'transparent', 'blue']).isRequired,
  size: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  width: PropTypes.string,
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  size: 'md',
  className: null,
  children: null,
  action: null,
  onClick: () => {},
  width: null,
  style: {}
};

export default Button;
