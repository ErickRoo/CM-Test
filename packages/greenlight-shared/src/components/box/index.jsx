import React from 'react';
import colors from '../../tokens/colors';

function Box({ children }) {
  return (
    <div
      style={{
        border: `1px solid ${colors.TIME_RED}`,
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
}

export default Box;
