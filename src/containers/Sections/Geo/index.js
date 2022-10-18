import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { Input, Button } from "antd";
import './styles.css'
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const Geo = () => {
  const [ pointsOnMap, setPointsOnMap ] = useState([])

  const { t } = useTranslation()

  const launchControls = <div style={{padding: '30px 0', width: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
    <Input
        style={{ width: "100%" }}
        defaultValue={'Location parsing - ' + Date().toString().split('GMT')[0]}
    />
    <Button onClick={()=> { 
      toast('Link copied!',
            {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        ); }} type="primary">{t('PARSE')}</Button>
  </div>
  
  const pointMode = {
    banner: true,
    control: {
      values: pointsOnMap,
      onClick: point =>
        setPointsOnMap(prevPoints => [...prevPoints, point]),
      onRemove: point =>
        setPointsOnMap(prevPoints => prevPoints.filter(p => p !== point)),
    }
  };
  const circleMode = {
    banner: true,
  };

  return <>
    <div style={{transitionDuration: '1s'}}>
      <LocationPicker showInputs={false} pointMode={pointMode} circleMode={circleMode} />
    </div>
    {launchControls}
  </>
};

export default Geo;