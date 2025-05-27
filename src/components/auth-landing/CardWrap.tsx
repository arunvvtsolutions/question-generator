import React, { FC, ReactElement } from 'react';

interface ICardWrapProps {
  children?: React.ReactNode;
  title: ReactElement;
}

const CardWrap: FC<ICardWrapProps> = ({ children, title }) => {
  return (
    <div className="mb-[60px]">
      {title}
      {children}
    </div>
  );
};

export default CardWrap;
