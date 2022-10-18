import React from 'react';
import * as Styles from './print-button.module.scss';

function PrintButton() {
  function handleClick(e) {
    e.preventDefault();

    window.print();
  }

  return <button type="button" aria-label="print" onClick={handleClick} className={Styles.root} />;
}

export default PrintButton;
