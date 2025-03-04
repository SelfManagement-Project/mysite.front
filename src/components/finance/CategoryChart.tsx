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
import { CategoryChartProps } from '@/types/finance/interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = ({ categoryBudgets }: CategoryChartProps) => {
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
  const data: ChartData<'doughnut'> = {
    labels: Array.isArray(categoryBudgets) ? categoryBudgets.map(budget => budget.category_name) : [],
    datasets: [
      {
        data: Array.isArray(categoryBudgets) ? categoryBudgets.map(budget => budget.amount) : [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverOffset: 4
      }
    ]
  };

  return <Doughnut data={data} options={options} />;
};
export default CategoryChart;