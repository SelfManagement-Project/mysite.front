// components/charts/CategoryChart.tsx
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['식비', '교통비', '생활비'],
    datasets: [
      {
        data: [600000, 400000, 1000000],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '카테고리별 지출'
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

export default CategoryChart;