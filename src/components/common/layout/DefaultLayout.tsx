// components/layout/DefaultLayout.tsx
import React from 'react';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FloatingMenu from "@/components/common/FloatingMenu";
import { useTabContext } from "@/contexts/TabContext";

interface DefaultLayoutProps {
  children: React.ReactNode;
  showNav?: boolean; // nav 표시 여부를 위한 prop 추가
}

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