import React from 'react';
import classNames from 'classnames/bind';
import * as styles from './styles.module.scss';

const cx = classNames.bind(styles);

function IconChevronRight() {
  return (
    <svg
      className={cx('IconChevronRight')}
      width="25px"
      height="44px"
      viewBox="0 0 25 44"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Group 3</title>
      <defs>
        <polygon id="path-1" points="0 0 24.1290323 0 24.1290323 44 0 44" />
      </defs>
      <g id="TIME-Studios---Work-Carousel" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Desktop-TIMEStudios-Project-Carousel" transform="translate(-103.000000, -244.000000)">
          <g id="Group-2" transform="translate(103.000000, 168.000000)">
            <g id="Group-3" transform="translate(0.000000, 76.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-2" />
              <path
                d="M23.4323705,39.8224195 C24.3612528,40.745838 24.3612528,42.3263041 23.4323705,43.2674806 C22.5034882,44.2441731 20.9611931,44.2441731 20.0147847,43.2674806 L0.736095409,23.7513873 C-0.245365136,22.7746948 -0.245365136,21.2119867 0.736095409,20.2530522 L20.0147847,0.719200888 C20.9611931,-0.239733629 22.5034882,-0.239733629 23.4323705,0.719200888 C24.3612528,1.69589345 24.3612528,3.22308546 23.4323705,4.18201998 L5.83618503,21.9755827 L23.4323705,39.8224195 Z"
                id="Fill-1"
                fill="#FFFFFF"
                mask="url(#mask-2)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default IconChevronRight;
