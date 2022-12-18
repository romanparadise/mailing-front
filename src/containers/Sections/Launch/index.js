import React, { useState, useMemo, useEffect } from "react";
import "antd/dist/antd.css";
import { Progress } from "antd";
import { Result } from "antd";
import { Checkbox, Input, Button } from "antd";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { InputNumber } from "antd";
import { launchMailing } from "requests";
import { compareAsc, format } from 'date-fns';
import GroupsPicker from 'components/GroupsPicker'
import { DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;


function replaceWithBr(input) {
  return input.replace(/\n/g, "<br />")
}


const default_message = {
  message:  [
  [
    "Привет\n", "Здравствуй\n", "Добрый вечер\n"
  ],
  [
    "Вступай в группу {links1}"
  ]
]
}

const default_links = {
  'links1': []
}

const random_choice = (arr) => {
  var rand = Math.random();
  rand *= arr.length; 
  rand = Math.floor(rand);

  let choice = arr[rand]

  return choice
}

const buildMessage = (msg, links, t) => {
  let result = ""
  try {
    msg.forEach(part => {
      let choice = random_choice(part)

      Array.from(Object.keys(links)).forEach(l => {
        choice = choice.replace('{'+l+'}', random_choice(links[l]) || `<span style="color: red;">${t('NO_LINKS')}</span>`)
      })

      choice = choice.replace("<br />", "");
      choice = choice.replace("\n", "<br />");

      result += choice
    })
  } catch(e) {
    result = "ERROR: INCORRECT SYNTAX"
  }
  
  return result
}


const Panel = ({ bots, parsedGroups }) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState(default_message)
  const [links, setLinks] = useState(default_links)
  const [textfield, setTextfield] = useState(JSON.stringify(default_message.message))

  const [selectedBots, setSelectedBots] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]); // TODO: remove on invalidatiom
  const [maxAmount, setMaxAmount] = useState(1000);

  const [mailingName, setMailingName] = useState(
    "mailing_" + format(new Date(), 'dd.MM_HH:mm')

  );

  const [hasSent, setHasSent] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);


  const handleSubmit = () => {
    if (selectedBots.length === 0 || selectedGroups.length === 0) {
      toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${t("CHOOSE_ITEMS")}`);
      return;
    }

    // if ()
    // for (let l of Object.keys(links)) {
    //   if (links[l].length === 0) {
    //     toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${t("PROVIDE_LINKS")}`);
    //     return;
    //   }
    // }

    const linksArg = []
    Object.keys(links).sort().forEach(k => linksArg.push(links[k]))

    setHasStarted(true);
    launchMailing({
      name: mailingName,
      max_messages: maxAmount,
      bots_to_use: selectedBots,
      recipient_groups: selectedGroups,
      message: message,
      links: linksArg
    })
      .then((res) => {
        if (res?.message?.toLowerCase().includes("succes")) {
          setHasSent(true);
          toast(t("SUCCESSFULLY_STARTED_MAILING"), {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.error(
            `${t("COULD_NOT_RUN_MAILING")}: ${
              res?.error || res?.message || "Something went wrong"
            }`
          );
          setSelectedBots([])
          setSelectedGroups([])
        }
      })
      .catch((e) => {
        toast.error(`${t("COULD_NOT_RUN_MAILING")}: ${e}`);
        setSelectedBots([])
        setSelectedGroups([])
      })
      .finally(() => {
        setHasStarted(false)
        setSelectedBots([])
        setSelectedGroups([])
      });
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
      <Input
        style={{ width: "100%" }}
        value={mailingName}
        onChange={(e) => setMailingName(e.target.value)}
      />
      <InputNumber
        min={1}
        max={1000000}
        style={{width:120}}
        value={maxAmount}
        onChange={(x) => setMaxAmount(x)}
      />
      <Button
        disabled={hasStarted}
        onClick={() => handleSubmit()}
        type="primary"
        style={{marginLeft: '5px'}}
      >
        {t("START")}
      </Button>
    </div>
  );

  const preview = useMemo(() => {
    try {
      const m = JSON.parse(textfield)
      setMessage(m)
      return buildMessage(m, links, t)
    } catch (e) {
      setMessage(null)
      return t("INCORRECT_SYNTAX")
    }
  }, [textfield, links])



  useEffect(() => {
    try{
      const r = JSON.stringify(JSON.parse(textfield), null, '\t')
      setTextfield(r)
    } catch(e) {
      
    }
  }, [textfield])

  const [linksText, setLinksText] = useState("")

  useEffect(() => {
    try{
      let r = linksText.replaceAll(' ', ',')
      r = r.replaceAll('\n', ',')
      r = r.split(',')
      r = r.filter(l => l.length > 0)
      setLinks({
        'links1': r,
      })
    } catch(e) {
      
    }
  }, [linksText])


  if (!hasSent)
    return (
      <>
        <div style={{ color: "#1890ff", fontSize: "15pt", padding: '10px' }}>{`${t(
          "AVAILABLE_BOTS"
        )} : ${bots?.map((b) => b.amount).reduce((p, c) => p + c, 0) || 0}`}</div>





      {/* <div style={{ width: "500px", margin: "20px auto" }}>
        <Input
          addonBefore="t.me/"
          onPressEnter={(e) => {
            addLink(e.target.value);
          }}
          placeholder={t("TYPE_AND_PRESS_ENTER_TO_ADD")}
        />
      </div>
      <div style={{ marginTop: "-30px", marginBottom: '10px', fontSize: "15pt", opacity: 0.5 }}>
        {links?.length ? t("FOLLOWING_GROUPS_WILL_BE_PARSED") : t("TYPE_LINKS_IN_FIELD_ABOVE")}
      </div>
      <div style={{ fontSize: "15pt", fontWeight: "300", opacity: 0.95 }}>
        {links.map((link) => {
          return (
            <div key={link}>
              <span>{link}</span>
              <span
                style={{
                  marginLeft: "5px",
                  color: "#888",
                  fontSize: "13pt",
                  opacity: 0.3,
                }}
                onClick={() => removeLink(link)}
              >
                <DeleteOutlined />
              </span>
            </div>
          );
        })}
      </div> */}




        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <TextArea onChange={e => {
                setTextfield(e.target.value)
              }} value = {textfield} rows={13} placeholder={t('TYPE_MESSAGE_HERE')} />
          </div>
          <div style={{position: 'relative', textAlign: 'left', fontSize: '12pt', borderBottom: '1px solid #d9d9d9',
            borderTop: '1px solid #d9d9d9', width: '50%',
            'border-right': '1px solid #d9d9d9'}}>
              <div style={{'font-weight': 'bold', borderBottom: '1px solid #d9d9d9', paddingLeft: '20px'}}>{t('MESSAGE_PREVIEW')}:</div>
              <div style={{padding: '0 20px', }} dangerouslySetInnerHTML={{__html: replaceWithBr(preview)}}></div>
              <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <div style={{'font-weight': 'bold', borderTop: '1px solid #d9d9d9', paddingLeft: '20px'}}>{t('LINKS')}:</div>
                <TextArea style={{resize: 'none'}} onChange={e => {
                  setLinksText(e.target.value)
                }} value = {linksText} rows={3} placeholder={t('TYPE_LINKS_HERE')} />
              </div>
          </div>
        </div>

        <GroupsPicker
           bots={bots}
           parsedGroups={parsedGroups}
           setSelectedBots={setSelectedBots}
           setSelectedGroups={setSelectedGroups}

        />
        
        {launchControls}
      </>
    );
  else
    return (
      <>
        <Result
          status="success"
          title={t("SUCCESSFULLY_STARTED_MAILING")}
          subTitle={
            t("SUCCESSFULLY_STARTED_MAILING_DESCRIPTION") +
            " " +
            mailingName +
            " to send " +
            maxAmount +
            " messages"
          }
          extra={[
            <div>
              {/* <div>Bots: </div>
              <div>
                {
                  
                
                selectedBots?.map((b) => b.name)
                  .join(", ")}
              </div>
            </div>,
            <div>
              <div>Groups: </div>
              <div>
                {
                selectedGroups?.map((g) => g.name)
                  .join(", ")}
              </div> */}
            </div>,
          ]}
        />
      </>
    );
};

export default Panel;
