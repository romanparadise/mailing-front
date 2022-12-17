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

const Mailings = ({ mailingsData }) => {
  const { t } = useTranslation();

  const [ statsMode, setStatsMode ] = useState('STATS')

  const downloadLogs = (id) => {
    window.open(`https://elpedroche.ru/logs?mailing_id=${id}`, '_blank')
  };

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
      <Charts />
    </div>
  } else {

  return (
    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
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
      <Collapse>
        {mailingsData?.map((item) => {
          return (
            <Panel header={item.name} key={item.id}>
              {Object.keys(item).map((k) => {
                return <p key={k}>{t(k.toUpperCase()) + " : " + item[k]}</p>;
              })}
              {
                <>
                  <Button
                    key={"btn1"}
                    onClick={() => downloadLogs(item.id)}
                    type="primary"
                  >
                    {t("DOWNLOAD_REPORT")}
                  </Button>
                  <Button
                    key={"btn2"}
                    onClick={() => fetchProgress(t, item.id)}
                    type="primary"
                  >
                    {t("INFO")}
                  </Button>
                  </>
              }
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
      }
};

export default Mailings;
