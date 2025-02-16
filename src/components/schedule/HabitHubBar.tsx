// src/components/HabitChart.tsx
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

interface HabitData {
    id: number;
    name: string;
    completed: number;
    remaining: number;
}

interface HabitChartProps {
    data: HabitData[];
}

const HabitHubBar = ({ data }: HabitChartProps) => {
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y',
        scales: {
            x: {
                stacked: true,
                max: 100,
                ticks: {
                    callback: ((value: number) => `${value}%`) as any
                }
            },
            y: {
                stacked: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    generateLabels: () => [
                        {
                            text: '진행',
                            fillStyle: '#3498db',
                            strokeStyle: '#3498db',
                            // 필수 속성들 추가
                            datasetIndex: 0,
                            hidden: false,
                            index: 0,
                            lineWidth: 1
                        },
                        {
                            text: '미진행',
                            fillStyle: '#f39c12',
                            strokeStyle: '#f39c12',
                            // 필수 속성들 추가
                            datasetIndex: 1,
                            hidden: false,
                            index: 1,
                            lineWidth: 1
                        }
                    ]
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw}%`
                }
            }
        },
        maintainAspectRatio: false
    };

    const chartData: ChartData<'bar'> = {
        labels: data.map(habit => habit.name),
        datasets: [
            {
                label: '진행',
                data: data.map(habit => habit.completed),
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 1
            },
            {
                label: '미진행',
                data: data.map(habit => habit.remaining),
                backgroundColor: '#f39c12',
                borderColor: '#f39c12',
                borderWidth: 1
            }
        ]
    };

    return <Bar options={options} data={chartData} />;
};

export default HabitHubBar;