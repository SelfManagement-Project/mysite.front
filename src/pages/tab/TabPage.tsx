// pages/tab/TabPage.tsx
import TabLayout from "@/components/common/layout/TabLayout"
import '@/assets/styles/pages/tab/TabPage.scss';

const TabPage = () => {

    return (
        <div className="tab-page-container">
            <div className="tab-page-box">
                <TabLayout />
            </div>
        </div>
    )
}

export default TabPage