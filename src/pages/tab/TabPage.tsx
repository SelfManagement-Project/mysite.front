// pages/tab/TabPage.tsx
import TabLayout from "@/components/common/layout/TabLayout"
import '@/assets/styles/pages/tab/TabPage.scss';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TabPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log('tab::::::',token);
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div className="tab-page-container">
            <div className="tab-page-box">
                <TabLayout />
            </div>
        </div>
    )
}

export default TabPage