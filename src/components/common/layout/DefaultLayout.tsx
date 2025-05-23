// components/layout/DefaultLayout.tsx
import React from 'react';
import Header from "@/components/common/Header";
import FloatingMenu from "@/components/common/FloatingMenu";
import { useTabContext } from "@/hooks/common/useTabContext";
import { DefaultLayoutProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정
import Footer from '../Footer';



const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, showNav = true }) => {
  const { handleMenuClick } = useTabContext();

  return (
    <>
      <Header onMenuClick={handleMenuClick} showNav={showNav} />
      <div className="content">
        {children}
      <Footer />
      </div>
      <FloatingMenu />
    </>
  );
};

export default DefaultLayout;