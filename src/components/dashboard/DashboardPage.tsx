import Footer from "@/components/common/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <iframe
        src="http://localhost:3000/goto/lJbVFApHR?orgId=1"
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Footer />
    </div>
  );
};

export default DashboardPage;
