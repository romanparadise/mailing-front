import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export default function App({mailingsData}) {
  const {t} = useTranslation()
  const data = {
    labels: mailingsData.map(i=> i.name),
    datasets: [
      {
        label: t('BOTS_AMOUNT'),
        data: mailingsData.map(i=> i.amount_sent),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <div style={{width: '300px'}}><PolarArea data={data} /></div>;
}
