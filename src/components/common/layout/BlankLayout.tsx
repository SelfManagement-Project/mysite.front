import React from 'react';
import { BlankLayoutProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정



const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default BlankLayout;