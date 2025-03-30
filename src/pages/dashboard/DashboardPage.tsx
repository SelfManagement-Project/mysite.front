import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@/assets/styles/pages/dashboard/DashboardPage.scss';
import DashBoard from "@/components/dashboard/DashBoard";

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
        <DashBoard />
      </div>
    </div>
  );
};

export default DashboardPage;