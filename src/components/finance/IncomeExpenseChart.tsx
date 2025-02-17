// components/charts/IncomeExpenseChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = () => {
  const data: ChartData<'line'> = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        label: '수입',
        data: [3000000, 2800000, 3200000, 3000000, 3100000, 3000000],
        borderColor: '#4CAF50',
        tension: 0.1,
      },
      {
        label: '지출',
        data: [2000000, 2100000, 1900000, 2200000, 2000000, 2000000],
        borderColor: '#F44336',
        tension: 0.1,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '월간 수입/지출 추이'
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default IncomeExpenseChart;