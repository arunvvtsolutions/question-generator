import React from 'react';
import { useTheme } from 'next-themes';
const ChevronDown = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div>
      <svg
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={22}
        height={22}
        // fill={resolvedTheme === 'light' ? '#000' : '#fff'}
         fill="#000"
      >
        <path d="M12 16L6 10H18L12 16Z"></path>
      </svg>
    </div>
  );
};

export default ChevronDown;
