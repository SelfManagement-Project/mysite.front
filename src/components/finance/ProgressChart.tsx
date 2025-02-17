// components/finance/ProgressChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressChartProps {
  percentage: number;
  label: string;
  color?: string;
}

const ProgressChart = ({ 
  percentage, 
  label, 
  color = '#4a90e2' 
}: ProgressChartProps) => {
  const data: ChartData<'bar'> = {
    labels: [label],
    datasets: [
      {
        data: [percentage],
        backgroundColor: color,
        borderRadius: 5,
        barThickness: 20,
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: {
          display: false
        }
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '50px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;