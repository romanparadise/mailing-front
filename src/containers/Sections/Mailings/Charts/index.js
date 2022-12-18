import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";
import { Segmented } from 'antd'
import ExtraChart from './Extra'
import './styles.css'


ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const Charts = ({ mailingsData }) => {

  const { t } = useTranslation()

  const dataLabels = mailingsData?.map(i => {
    return i.name
  })

  const dataSent = mailingsData?.map(i => {
    return i.amount_sent
  })

  // mailingsData.map(i => {
  //   return {
  //     groups: i.targetGroups,
  //     sentAmount: i.sentAmount,
  //   }
  // })

  // let targetGroupsAmount = new Object.fromEntries([])


  const sentChart = <div style={{width: '300px'}}>
    {/* <div>{t('SENT_MESSAGES')}</div>
    <div style={{opacity: 0.5, fontSize: '12pt', textAlign: "justify",
  textJustify: "inter-word"}}>{t('SENT_MESSAGES_DESCRIPTION')}</div> */}
    <Doughnut
      width= '100px'
      data= {{
        labels: dataLabels,
        datasets: [
          {
            label: '',
            data: dataSent,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }}
    />  
  </div>

  const labels = mailingsData?.map(i => i.name)

  const data = {
    labels,
    datasets: [
      {
        label: t('BOTS_DIED'),
        data: mailingsData?.map((i) => i.bots_died),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: t('BOTS_USED'),
        data: mailingsData?.map((i) => i.bots_alived + i.bots_died),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: t('MESSAGES_SENT'),
        data: mailingsData?.map((i) => i.amount_sent),
        backgroundColor: 'rgb(53, 162, 235)',
      },
    ],
  };

  const options = {
    // plugins: {
    //   title: {
    //     display: true,
    //     text: t('EFFECTIVENESS_CHART'),
    //   },
    // },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const barChart = <div>
    <div style={{marginTop: '20px'}}>{t('EFFECTIVENESS')}</div>
    <div style={{opacity: 0.5, fontSize: '12pt', textAlign: "justify",
    textJustify: "inter-word"}}>{t('EFFECTIVENESS_DESCRIPTION')}</div>
    <Bar options={options} data={data} />
  </div>


  return (
      <div className="charts-container">
        {/* <div style={{margin: 'auto', width: 'fit-content'}}>
          <div style={{display: 'flex', width: 'fit-content'}}>
            <div>
              <div>{t('SENT_MESSAGES_TO_GROUPS')}</div>
              <div>{sentChart}</div>
            </div>
            <div>
              <div>{t('SENT_MESSAGES_BY_BOT_GROUPS')}</div>
              <div><ExtraChart 
                mailingsData={mailingsData}
              /></div>
            </div>
          </div>
        </div> */}
        <div style={{margin: 'auto'}}>
        {barChart}
        </div>
        
      </div>
  )
};





export default Charts;
