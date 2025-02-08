import React from 'react';

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default BlankLayout;