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

const Charts = ({ mailingsData=[
  {
    name: 'some name',
    id: 123123123,
    sentAmount: 123,
    botsAlive: 111,
    botsDied: 333,
    targetGroups: ['asdasdsa', 'asdsadasdss'],
  },
  {
    name: 'some name211',
    id: 2222222,
    sentAmount: 1203,
    botsAlive: 122,
    botsDied: 999,
    targetGroups: ['asdsadasdss'],
  },
  {
    name: 'some name2',
    id: 4444,
    sentAmount: 1203,
    botsAlive: 122,
    botsDied: 999,
    targetGroups: ['asdsadasdss'],
  },
  {
    name: 'some name22',
    id: 213123,
    sentAmount: 1111,
    botsAlive: 1111,
    botsDied: 111,
    targetGroups: ['asdsadasdss'],
  },
  {
    name: 'some name2222',
    id: 333333,
    sentAmount: 1203,
    botsAlive: 122,
    botsDied: 999,
    targetGroups: ['asdsadasdss'],
  }
] }) => {

  const { t } = useTranslation()

  const dataLabels = mailingsData.map(i => {
    return i.name
  })

  const dataSent = mailingsData.map(i => {
    return i.sentAmount
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

  const labels = mailingsData.map(i => i.name)

  const data = {
    labels,
    datasets: [
      {
        label: t('BOTS_DIED'),
        data: mailingsData.map((i) => i.botsDied),
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: t('BOTS_USED'),
        data: mailingsData.map((i) => i.botsAlive + i.botsDied),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: t('MESSAGES_SENT'),
        data: mailingsData.map((i) => i.sentAmount),
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
    <div style={{marginTop: '50px'}}>{t('EFFECTIVENESS')}</div>
    <div style={{opacity: 0.5, fontSize: '12pt', textAlign: "justify",
    textJustify: "inter-word"}}>{t('EFFECTIVENESS_DESCRIPTION')}</div>
    <Bar options={options} data={data} />
  </div>


  return (
      <div className="charts-container">
        <div style={{margin: 'auto', width: 'fit-content'}}>
          <div style={{display: 'flex', width: 'fit-content'}}>
            <div>
              <div>{t('SENT_MESSAGES_TO_GROUPS')}</div>
              <div>{sentChart}</div>
            </div>
            <div>
              <div>{t('SENT_MESSAGES_BY_BOT_GROUPS')}</div>
              <div><ExtraChart /></div>
            </div>
          </div>
        </div>
        <div style={{margin: 'auto'}}>
        {barChart}
        </div>
        
      </div>
  )
};





export default Charts;
