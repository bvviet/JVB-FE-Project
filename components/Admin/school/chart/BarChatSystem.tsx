import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartSystemProps {
  labels: string[];
  dataValues: number[][];
}

const BarChartSystem: React.FC<BarChartSystemProps> = ({ labels, dataValues }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Đã duyệt / Chấp nhận',
        data: dataValues[0],
        backgroundColor: 'pink',
      },
      {
        label: 'Chờ duyệt',
        data: dataValues[1],
        backgroundColor: 'green',
      },
      {
        label: 'Đã khóa / Từ chối',
        data: dataValues[2],
        backgroundColor: 'blue',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Biểu đồ trạng thái tổng hợp',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartSystem;
