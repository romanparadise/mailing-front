import LocationPicker from "react-leaflet-location-picker";
import { useState } from "react";
import { Input, Button } from "antd";
import "./styles.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { launchParsing } from "requests";
import { Col, InputNumber, Row, Slider } from 'antd';
import { compareAsc, format } from 'date-fns'


const getGeotags = () => {
  let r = []
  const elems = document.getElementsByClassName('full-height no-margin text')
  Array.from(elems).forEach(i => r.push(i.innerText))

  r = r.map(i => {
    i = i.replaceAll('(', '')
    i = i.replaceAll(')', '')
    i = i.replaceAll(' ', '')
    i = i.replaceAll('-', ':')
    i = i.replaceAll(',', ':')
    return i
  })
  return r.join(',')
}

const Geo = () => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  const [pointsOnMap, setPointsOnMap] = useState([]);
  const [parsingName, setParsingName] = useState(
    "geo_" + format(new Date(), 'dd.MM_HH:mm')

  );
  const [hasStarted, setHasStarted] = useState(false);

  const { t } = useTranslation();

  const sendParsingRequest = async () => {
    const circles = getGeotags()
    setHasStarted(true);
    if (pointsOnMap.length === 0 && circles.length === 0) {
      toast.error(t("TAGS_LIST_IS_EMPTY"));
      setHasStarted(false);
      return;
    }

    if (!parsingName) {
      toast.error(t("NAME_IS_EMPTY"));
      setHasStarted(false);
      return;
    }

    let res;

    try {
      res = await launchParsing({
        name: parsingName,
        points: pointsOnMap,
        circles: circles
      });
    } catch(e) {
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${e}`
      );
      setHasStarted(false);
      return
    }

    if (res && !res?.error) {
      setPointsOnMap([]);
      toast(t("PARSING_STARTED"), {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      console.log('error: ', res)
      toast.error(
        `${t("COULD_NOT_RUN_PARSING")}: ${res?.message || res?.detail?.msg || res?.error || "Something went wrong"}`
      );
    }

    setHasStarted(false);
  };

  const launchControls = (
    <div
      style={{
        padding: "30px 0",
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{margin: '0 auto'}}>
        <Button disabled={hasStarted} onClick={sendParsingRequest} type="primary">
          <span>{t("PARSE")}</span>
        </Button>
      </div>
    </div>
  );

  const pointMode = {
    banner: false,
    control: {
      values: pointsOnMap,
      onClick: point => {
        // const stepX = 0.01
        // const stepY = 0.015
        // const n = inputValue - 1
        // let radius = 0;
        // var angle = 0;
        const newPoints = [point]
        // for (let i = -1*n; i < n; i += 1) {
        //   for (let j = -1*n; j < n; j += 1) {
        //   newPoints.push([point[0] + i*stepX, point[1] + j*stepY])
        //   }
        // }
        // for (var n = 0; n < 150; n++) {
        //   //radius += 0.002;
        //   // make a complete circle every 50 iterations
        //   // angle += (Math.PI * 2) / 50;
        //   // let x=point[0] + radius * Math.cos(angle);
        //   // let y=point[1] + radius * Math.sin(angle)

        //   newPoints.push([x, y]);
        // }
        setPointsOnMap((prevPoints) => [...prevPoints, ...newPoints])

      },
      onRemove: (point) =>
        setPointsOnMap((prevPoints) => prevPoints.filter((p) => p !== point)),
    },
  };
  const circleMode = {
    banner: true,
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
      <div style={{margin: '-10px 0 0 -50px', width: 'fit-content', borderBottom: '1px solid #eee', width: 'calc(100% + 100px)'}}>
          <div style={{ width: 'fit-content', margin: 'auto'}}>
            <div style={{display: 'flex', fontSize: '12pt'}}>
              <div style={{margin: '10px'}}>{t("ENTER_NAME_TO_SAVE")}</div>
              <div style={{width: '200px', margin: '10px'}}><Input
                style={{ width: "100%" }}
                value={parsingName}
                onChange={(e) => setParsingName(e.target.value)}
                size='small'
              /></div>
            </div>
          </div>
        </div>
        <div style={{marginTop: '10px'}}>
        <LocationPicker
          showInputs={false}
          pointMode={pointMode}
          circleMode={circleMode}
        />
        </div>
        <div style={{margin: '30px auto 20px auto'}}>
          <Row align="middle" justify="center">
          <div style={{fontSize:'11pt', marginRight: '10px'}}>{t('POINTS_AMOUNT_PER_KM')}</div>
            <Col span={10}>
              <Slider
                min={1}
                max={10}
                onChange={onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
              />
            </Col>
            <Col style={{marginTop: '-10px'}} span={4}>
              <InputNumber
                min={1}
                max={10}
                style={{ margin: '0 16px' }}
                value={inputValue}
                onChange={onChange}
              />
            </Col>
          </Row>
          <div style={{opacity: 0.5, fontSize: '12pt', textAlign: "justify",
  textJustify: "inter-word", margin: '10px 60px'}}>{t('POINTS_PER_KM_HELP')}</div>
        </div>
      </div>
      {launchControls}
    </>
  );
};

export default Geo;
