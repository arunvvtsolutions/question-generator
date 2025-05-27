import React from 'react';
import { useTheme } from 'next-themes';

const RightAngleIcon = ({ width = '15', height = '34', className }: { width?: string; height?: string; className?: string }) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg width={width} height={height} viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M9.54553 12.0001L0 21.3333L2.72724 24L15 12.0001L2.72724 0L0 2.66667L9.54553 12.0001Z"
        fill={resolvedTheme === 'light' ? '#000' : '#fff'}
      />
    </svg>
  );
};

export default RightAngleIcon;
