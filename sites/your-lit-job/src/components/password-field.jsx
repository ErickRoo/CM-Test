import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './password-field.module.scss';

function PasswordField({ id, value, className, visible, onChange, onToggleVisible }) {
  return (
    <div className={Styles.root}>
      <input
        type={visible ? 'text' : 'password'}
        id={id}
        value={value}
        minLength="6"
        required
        className={classNames(className, 'form-control')}
        onChange={onChange}
      />

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        onClick={onToggleVisible}
        className={Styles.toggle}
        data-visible={visible ? 0 : 1}
        title="toggle password visibility"
      />
    </div>
  );
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleVisible: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  className: '',
};

export default PasswordField;
