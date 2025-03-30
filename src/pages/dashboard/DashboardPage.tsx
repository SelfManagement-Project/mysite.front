import Footer from "@/components/common/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@/assets/styles/components/dashboard/DashboardPage.scss';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>대시보드</h1>
          <div className="dashboard-actions">
            {/* <button className="secondary">새로고침</button>
            <button>설정</button> */}
          </div>
        </div>

        <div className="dashboard-iframe-container">
          <iframe
            src="http://localhost:3000/goto/lJbVFApHR?orgId=1"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;