import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Styles from './modal-x.module.scss';

function ModalX({ close, className }) {
  return (
    // Intentionally disabled; button does not need label per code examples from other reputable websites
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button type="button" onClick={close} title="Close" className={classNames(Styles.root, className)} />
  );
}

ModalX.propTypes = {
  close: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ModalX.defaultProps = {
  className: null,
};

export default ModalX;
