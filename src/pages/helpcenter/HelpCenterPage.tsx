import HelpCenter from "@/components/helpcenter/HelpCenter";
import '@/assets/styles/pages/helpcenter/HelpCenterPage.scss';

const HelpCenterPage = () => {


    return (
        <div className="help-center-page">
            <div className="help-center-content">
                <HelpCenter />
            </div>
        </div>
    );
};

export default HelpCenterPage;