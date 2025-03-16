// components/schedule/modal/WeeklyReportChart.tsx
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
import { Habit } from '@/types/schedule/interfaces';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface WeeklyReportChartProps {
    data: Habit[];
    weeklyData: any;
}

const WeeklyReportChart = ({ data, weeklyData }: WeeklyReportChartProps) => {
    // 요일 데이터
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    
    // 실제 데이터 또는 기본 데이터 사용
    const dailyRates = weeklyData?.dailyRates || [65, 70, 80, 75, 60, 90, 85];
    
    // 차트 데이터
    const chartData: ChartData<'line'> = {
        labels: days,
        datasets: [
            {
                label: '습관 달성률',
                data: dailyRates,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                tension: 0.3
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '이번 주 습관 달성률'
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

    return <Line options={options} data={chartData} />;
};

export default WeeklyReportChart;