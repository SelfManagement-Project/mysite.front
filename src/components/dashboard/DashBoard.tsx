// components/dashboard/DashBoard.tsx
import '@/assets/styles/components/dashboard/DashBoard.scss';

const DashBoard = () => {

  return (
    <div>
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
  );
};

export default DashBoard;