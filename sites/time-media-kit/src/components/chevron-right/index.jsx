import React from 'react';

function ChevronRight({ width, height }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="10 6 8.59 7.41 13.17 12 8.59 16.59 10 18 16 12" />
    </svg>
  );
}

export default ChevronRight;
