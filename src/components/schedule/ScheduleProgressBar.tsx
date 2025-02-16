import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ProgressChartProps {
    completedTasks: number;
    totalTasks: number;
}

const ProgressChart = ({ completedTasks, totalTasks }: ProgressChartProps) => {
    const percentage = (completedTasks / totalTasks) * 100;

    //   const data = {
    //     labels: [''], // 빈 라벨로 설정하여 바만 표시
    //     datasets: [
    //       {
    //         label: '완료율',
    //         data: [percentage],
    //         backgroundColor: '#4a90e2',
    //         borderColor: '#4a90e2',
    //         borderWidth: 1,
    //         fill: true,
    //         tension: 0.4
    //       }
    //     ]
    //   };

    //   const options = {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         max: 100,
    //         grid: {
    //           drawBorder: false
    //         }
    //       },
    //       x: {
    //         display: false // x축 숨기기
    //       }
    //     },
    //     plugins: {
    //       legend: {
    //         display: false // 범례 숨기기
    //       },
    //       title: {
    //         display: false
    //       }
    //     }
    //   };

    return (
        <div style={{ width: '100%', height: '20px', position: 'relative' }}>
            <div className="progress-container" style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#e2e8f0',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div className="progress-bar" style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: '#4a90e2',
                    transition: 'width 0.3s ease'
                }}></div>
            </div>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#000'
            }}>
                {percentage.toFixed(0)}% 달성
            </div>
        </div>
    );
};

export default ProgressChart;