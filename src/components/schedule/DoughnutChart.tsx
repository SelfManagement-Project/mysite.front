import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

interface DoughnutChartProps {
  completedTasks: number;
  totalTasks: number;
}

const DoughnutChart = ({ completedTasks, totalTasks }: DoughnutChartProps) => {
  const percentage = (completedTasks / totalTasks) * 100;

  const data = {
    labels: ['완료', '미완료'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#4a90e2', '#e2e8f0'],
        borderWidth: 0
      }
    ]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
};

export default DoughnutChart;