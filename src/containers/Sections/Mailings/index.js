import React from "react";
import "antd/dist/antd.css";
import { Collapse } from "antd";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { fetchLogs } from "requests";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import {Segmented} from 'antd'
import Charts from "./Charts";
import { compareAsc, format } from 'date-fns'
import Stats from "components/Stats"
import { MdHeight } from "react-icons/md";
import { Empty } from 'antd';
import { Spin } from 'antd';

const BOT_COST = 0.15

const fetchProgress = async (t, id) => {
  
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/progress?mailing_id=${id}`
  );

  console.log(data)

  alert(
    `${t('SENT_AMOUNT')}: ${data.sentAmount} | `+ 
    `${t('BOTS_SURVIVED')}: ${data.botsAlived} | `+
    `${t('BOTS_DIED')}: ${data.botsDied}`
  )

  return data
}

const { Panel } = Collapse;

const mock = [
  {
    "id": "1670522250.0883262",
    "status": true,
    "bots": ["555_555_3738"],
    "started_at": 1670522250.0883262,
    "name": "Nmssae",
    "amount_sent": 180,
    "parseds": ["chat_fonbet CTABKM"],
    "botsDied": 11,
    "botsAlived": 22,
    },
    {
      "id": "167050.0883262",
      "status": false,
      "bots": ["555_555_3738"],
      "started_at": 1670522250.0883262,
      "name": "Nmssssae",
      "amount_sent": 118,
      "parseds": ["chat_fonbet CTABKM"],
      "botsDied": 11,
      "botsAlived": 22,
      },
      {
        "id": "16702250.0883262",
        "status": false,
        "bots": ["555_555_3738"],
        "started_at": 1670522250.0883262,
        "name": "Nm111ae",
        "amount_sent": 189,
        "parseds": ["chat_fonbet CTABKM"],
        "botsDied": 11,
        "botsAlived": 22,
        },
        {
          "id": "167052ww2250.0883262",
          "status": false,
          "bots": ["555_555_3738"],
          "started_at": 1670522250.0883262,
          "name": "N2222mae",
          "amount_sent": 288,
          "parseds": ["chat_fonbet CTABKM"],
          "botsDied": 11,
          "botsAlived": 22,
          } 
  ]
  

const Mailings = ({ mailingsData=[], bots=[] }) => {
  // mailingsData = mock

  // mailingsData = mailingsData.filter(i => !i.status) 

  console.log(mailingsData)



  const { t } = useTranslation();

  const [ statsMode, setStatsMode ] = useState('STATS')

  const downloadLogs = (id) => {
    window.open(`https://elpedroche.ru/logs?mailing_id=${id}`, '_blank')
  };

  const messagesSent = mailingsData?.filter(i=>i.name).map(i=>i.amount_sent).reduce((a,b)=>a+b, 0)
  const botsAlive = bots?.map((b) => b.amount).reduce((p, c) => p + c, 0)
  const botsDied = mailingsData?.map(i=>i.bots_died).reduce((a,b)=>a+b, 0)
  const botsInWork = bots?.filter(i => i.occupied)?.map(i => i.amount).reduce((p, c) => p + c, 0)
  const botsDiedInMailings = mailingsData?.filter(i=>i.name).map(i=>i.bots_died).reduce((a,b)=>a+b, 0)

  if (statsMode == 'STATS') {
    return <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <div className="mailingsModePicker">
      <Segmented onChange={() => setStatsMode(p => p == 'DETAILS' ? 'STATS' : 'DETAILS')} options={[
          {
          label: t('STATISTICS'),
          value: 'STATS'
          },
          { label: t('DETAILS'),
          value: 'DETAILS'
          }]} 
          />
      </div>
      <Stats 
          botsAlive={botsAlive}
          messagesSent={messagesSent}
          messageCost={messagesSent ? botsDiedInMailings*BOT_COST/messagesSent : null}
          botsDied={botsDied}
          botsInWork={botsInWork}
          botsDiedInMailings={botsDiedInMailings}
      />
      <Charts 
        mailingsData={mailingsData.filter(i=>i.name)}
      />
    </div>
  } else {

  return (
    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <div style={{marginBottom: '10px'}} className="mailingsModePicker">
        <Segmented onChange={() => setStatsMode(p => p == 'DETAILS' ? 'STATS' : 'DETAILS')} options={[
          {
          label: t('STATISTICS'),
          value: 'STATS'
          },
          { label: t('DETAILS'),
          value: 'DETAILS'
          }]} 
          />
      </div>
      {(mailingsData && mailingsData.length) ? (<Collapse>
        {mailingsData?.map((item) => {
          return (
            <Panel header={<div style={{textAlign: 'left'}}>{item.name || t('GROUP_INVITING')}{item.status && <div style={{float: 'right',color: '#1890ff'}}>{t('IN_PROGRESS')}<div style={{marginLeft: '10px', display: 'inline-block'}}><Spin /> </div></div>}</div>} key={item.id}>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', borderBottom: '1px solid #ddd'}}>
                <div style={{width: '50%'}}>{t("BOTS_GROUP_USED")}</div>
                <div style={{width: '50%'}}>{item.bots}</div>
              </div>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', borderBottom: '1px solid #ddd'}}>
                <div style={{width: '50%'}}>{t("RECIPIENTS")}</div>
                <div style={{width: '50%'}}>{new Set(item.parseds?.map(i=>i.split(' ')[1]))}</div>
              </div>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', borderBottom: '1px solid #ddd'}}>
                <div style={{width: '50%'}}>{t("STARTED_AT")}</div>
                <div style={{width: '50%'}}>{new Date(item.started_at * 1000).toLocaleString()}</div>
              </div>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                <div style={{width: '50%'}}>{t("BOTS_SURVIVED")}</div>
                <div style={{color: 'green', width: '50%'}}>{item.bots_alived}</div>
              </div>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', borderBottom: '1px solid #ddd' }}>
                <div style={{width: '50%'}}>{t("BOTS_DIED")}</div>
                <div style={{color: 'red', width: '50%'}}>{item.bots_died}</div>
              </div>
              <div style={{textAlign: 'left', display: 'flex', width: '100%', }}>
                <div style={{width: '50%'}}>{t("AMOUNT_SENT")}</div>
                <div style={{color: '#1890ff', width: '50%'}}>{item.amount_sent}</div>
              </div>
              
              {
                <div style={{width: 'fit-content', margin: "10px auto",display:'flex', marginTop: '10px'}}>
                  <Button
                    key={"btn1"}
                    onClick={() => downloadLogs(item.id)}
                    type="primary"
                  >
                    {t("DOWNLOAD_REPORT")}
                  </Button>
                  {/* <div style={{marginLeft: '10px'}}>
                    <Button
                      key={"btn2"}
                      onClick={() => fetchProgress(t, item.id)}
                      type="primary"
                      
                    >
                      {t("INFO")}
                    </Button>
                    </div> */}
                  </div>
              }
            </Panel>
          );
        })}
      </Collapse>) : <div style={{minHeight: '500px'}}><div style={{marginTop: '200px'}}><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('NOTHING_TO_SHOW')} /></div>
        </div>}
    </div>
  );
      }
};

export default Mailings;
