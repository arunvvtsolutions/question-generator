import React from 'react';

const UpIconLarge = ({color}:{color:string}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="36" viewBox="0 0 20 36" fill="none">
      <path
        d="M10.21 34.4824V1.51953M10.21 1.51953L19.0001 10.3942M10.21 1.51953L1.41992 10.3942"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpIconLarge;
