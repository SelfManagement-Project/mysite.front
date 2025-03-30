import Announcements from "@/components/announcements/Announcements";
import '@/assets/styles/pages/announcements/AnnouncementsPage.scss';

const AnnouncementsPage = () => {

    return (
        <div className="announcements-page">
            <div className="announcements-content">
                <Announcements />
            </div>
        </div>
    );
};

export default AnnouncementsPage;