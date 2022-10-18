import React from 'react';

function ChevronLeft({ width, height }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="15.41 7.41 14 6 8 12 14 18 15.41 16.59 10.83 12" />
    </svg>
  );
}

export default ChevronLeft;
