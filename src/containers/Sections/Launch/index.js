import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Progress } from 'antd';
import { Result } from 'antd';
import { Checkbox, Input, Button } from "antd";
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next';
import { InputNumber } from 'antd';
import { launchMailing } from 'requests';



const Panel = ({ bots, parsedGroups, proxiesAmount }) => {
  const { t } = useTranslation()

  const [selectedBots, setSelectedBots] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [maxAmount, setMaxAmount] = useState(1000)

  const [ mailingName, setMailingName ] = useState('Mailing - ' + Date().toString().split('GMT')[0])

  const [hasSent, setHasSent] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const handleSubmit = () => {
    if (selectedBots.length === 0 || selectedGroups === 0) {
      toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${t("CHOOSE_ITEMS")}`)
      return 
    }

    setHasStarted(true)
    launchMailing({
      name: mailingName,
      max_messages: maxAmount,
      bots_to_use: selectedBots,
      recepient_groups: selectedGroups
    })
    .then(res => {
      if (res.success) {
        setHasSent(true)
        toast('started!',
          {
              icon: '👏',
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
              },
          })
      } else {
        toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${res?.error || "Something went wrong"}`)
      }
    })
    .catch(e => {
      toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${e}`)
    })
    .finally(() => setHasStarted(false))
  }

  const launchControls = <div style={{padding: '30px 0', width: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
    <Input
        style={{ width: "100%" }}
        value={mailingName}
        onChange={(e) => setMailingName(e.target.value)}
    />
    <InputNumber min={1} max={1000000} value={maxAmount} onChange={(x) => setMaxAmount(x)} />
    <Button disabled={hasStarted} onClick={()=> handleSubmit()} type="primary">{t('START')}</Button>
    </div>


if (!hasSent)
  return <>
    <div style={{color: '#b0f', fontSize: '15pt'}}>{`${t('AVAILABLE_BOTS')} : ${bots?.map(b => b.amount).reduce((p, c) => p+c) || 0}`}</div>
    <div style={{width: '500px', margin: '0 auto', display: 'flex', color: '#fff'}}>
      <div className='check-items'>
        <div>{t('SELECT_BOTS')}</div>
        <Checkbox.Group
          options={bots?.map(botGroup => {
            return {
              label: botGroup.name + ' - ' + botGroup.amount,
              value: botGroup.id,
              disabled: botGroup.occupied
            }
          })}
          onChange={(bots)=>{setSelectedBots(bots)}}
        />
      </div>

      <div className='check-items'>
        <div>{t('SELECT_PARSED_BATCHES')}</div>
        
        <Checkbox.Group
          options={parsedGroups.map(g => {
            return {
              label: <div><span>{g.name}</span> - <span>{g.amount}</span></div>,
              value: g.id,
            }
          })}
          onChange={(groups)=>{setSelectedGroups(groups)}}
        />
      </div>
    </div>
    {launchControls}
  </>
else 
  return <>
    <Result
    status="success"
    title={t("SUCCESSFULLY_STARTED_MAILING")}
    subTitle={t("SUCCESSFULLY_STARTED_MAILING_DESCRIPTION") + ' ' + mailingName}
    extra={[ 
      <div>
        <div>Bots:</div>
        <div>{selectedBots}</div>
      </div>,
      <div>
        <div>Groups:</div>
        <div>{selectedGroups}</div>
    </div>
    ]}
  />
  </>
};

export default Panel;