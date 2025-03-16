// components/schedule/modal/MonthlyReportChart.tsx
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
import { Habit } from '@/types/schedule/interfaces';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface MonthlyReportChartProps {
    data: Habit[];
    monthlyData: any;
}

const MonthlyReportChart = ({ data, monthlyData }: MonthlyReportChartProps) => {
    // 주차 데이터
    const weeks = ["1주차", "2주차", "3주차", "4주차"];
    
    // 실제 데이터가 있으면 사용, 없으면 기본 데이터 생성
    const habitsWithData = monthlyData?.habitWeeklyRates || 
        data.map((habit: Habit) => ({
            name: habit.name,
            rates: [
                Math.floor(Math.random() * 100), 
                Math.floor(Math.random() * 100), 
                Math.floor(Math.random() * 100), 
                Math.floor(Math.random() * 100)
            ]
        }));
    
    // 차트 데이터
    const chartData: ChartData<'bar'> = {
        labels: weeks,
        datasets: habitsWithData.map((habit: any, index: number) => ({
            label: habit.name,
            data: habit.rates,
            backgroundColor: `rgba(${index * 50}, 152, 219, 0.7)`,
        }))
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '이번 달 습관별 달성률'
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    callback: ((value: number) => `${value}%`) as any
                }
            }
        }
    };

    return <Bar options={options} data={chartData} />;
};

export default MonthlyReportChart;