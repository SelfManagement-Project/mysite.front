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
import { Transaction } from '@/types/finance/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// components/charts/IncomeExpenseChart.tsx
interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

const IncomeExpenseChart = ({ transactions }: IncomeExpenseChartProps) => {
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
  const processData = () => {
    const monthlyData = Array(12).fill(0).map(() => ({ income: 0, expense: 0 }));

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth();
      if (transaction.is_income) {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expense += transaction.amount;
      }
    });

    return {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      datasets: [
        {
          label: '수입',
          data: monthlyData.map(d => d.income),
          borderColor: '#4CAF50',
          tension: 0.1,
        },
        {
          label: '지출',
          data: monthlyData.map(d => d.expense),
          borderColor: '#F44336',
          tension: 0.1,
        }
      ]
    };
  };

  return <Line data={processData()} options={options} />;
};

export default IncomeExpenseChart;