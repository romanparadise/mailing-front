import React from 'react';
import 'antd/dist/antd.css';
import { Progress } from 'antd';
import { Checkbox, Input, Button } from "antd";
import toast from 'react-hot-toast'




const Panel = ({ bots, parsedGroups }) => {

  const launchControls = <div style={{padding: '30px 0', width: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
  <Input
      style={{ width: "100%" }}
      defaultValue={'Sending - ' + Date().toString().split('GMT')[0]}
  />
  <Button onClick={()=> { 
    toast('started!',
          {
              icon: '👏',
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
              },
          }
      ); }} type="primary">START</Button>
</div>

  return <div style={{width: '500px', margin: '0 auto'}}>
    SELECT BOTS
    <Checkbox.Group
      options={bots?.map(bot => {
        return {
          label: bot.name,
          value: bot.id,
          disabled: bot.occupied
        }
      })}
      onChange={()=>{}}
    />
    SELECT PARSED BATCHES
    <Checkbox.Group
      options={['parsed gabmlers', 'parsed taxists']}
      onChange={()=>{}}
    />
    {launchControls}
  </div>
};

export default Panel;