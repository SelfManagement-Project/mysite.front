// components/layout/DefaultLayout.tsx
import React from 'react';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingMenu from "@/components/common/FloatingMenu";
import { useTabContext } from "@/hooks/common/useTabContext";
import { DefaultLayoutProps } from "@/types/common/interfaces"; // 파일 경로에 맞게 수정



const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, showNav = true }) => {
  const { handleMenuClick } = useTabContext();

  return (
    <>
      <Header onMenuClick={handleMenuClick} showNav={showNav} />
      <div className="content">
        {children}
      </div>
      <Footer />
      <FloatingMenu />
    </>
  );
};

export default DefaultLayout;