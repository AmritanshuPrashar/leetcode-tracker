import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubmissionsChart = ({ easySolved, totalEasy, mediumSolved, totalMedium, hardSolved, totalHard }) => {
  const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Solved',
        data: [easySolved, mediumSolved, hardSolved],
        backgroundColor: '#34AAFF',
      },
      {
        label: 'Total',
        data: [totalEasy, totalMedium, totalHard],
        backgroundColor: '#2A60FE',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10,
            color: '#EFEFEF',
          },
        },
      },
      title: {
        display: true,
        text: 'Submissions by Difficulty',
        font: {
          size: 14,
          color: '#EFEFEF',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
            color: '#EFEFEF',
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
            color: '#EFEFEF',
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} height={200} />;
};

export default SubmissionsChart;
