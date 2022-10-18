import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function Credits() {
  return (
    <div className={cx('Credits')}>
      <ul>
        <li>PROJECT LEADERS: NAINA BAJEKAL, AMIE FERRIS-ROTMAN AND ZAHRA JOYA</li>
        <li>PHOTO EDITORS: SANGSUK SYLVIA KANG, PAUL MOAKLEY, AND KATHERINE POMERANTZ</li>
        <li>DIGITAL DEVELOPMENT & DESIGN: TIMOTHY BOOSER, AUDREY CLARK, AND KAREN WERLING</li>
        <li>PRINT DESIGN: VICTOR WILLIAMS AND D.W. PINE</li>
        <li>EDITORS: KELLY CONNIFF, SAM JACOBS, LILY ROTHMAN AND KARL VICK</li>
        <li>
          AUDIENCE EDITORS: SAMANTHA COONEY, ANNABEL GUTTERMAN, ALEX HINNANT, SOO JIN KIM, CAROLINE OLNEY, KITTY RUSKIN,
          KARI SONDE, AND KIMBERLY TAL
        </li>
        <li>COPY EDITORS: HELEN EISENBACH, MARK HOKODA, AND JENNIFER SCHIAVONE</li>
        <li>FACT-CHECKERS: ANISHA KOHLI AND JULIA ZORTHIAN</li>
      </ul>
    </div>
  );
}

export default Credits;
