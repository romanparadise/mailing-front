import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast'
import { launchParsing } from 'requests';


const Links = () => {
    const {t} = useTranslation()

    const [hasStarted, setHasStarted] = useState(false)

    const [ links, setLinks ] = useState([])
    const [ parsingName, setParsingName ] = useState('Groups parsing - ' + Date().toString().split('GMT')[0])

    const addLink = link => setLinks(prevLinks => (prevLinks.includes(link) || !link) ? prevLinks : [...prevLinks, link])
  
    const removeLink = link => setLinks(prevLinks => prevLinks.filter(l => l !== link))
  
    const sendParsingRequest = async () => {
        setHasStarted(true)
        if (links.length === 0) {
            toast.error(t("LINKS_LIST_IS_EMPTY"))
            setHasStarted(false)
            return
        }

        const res = await launchParsing({
            name: parsingName,
            groups: links,
        })

        if (res && !res.error) {
            setLinks([])
            toast(t('PARSING_STARTED'),
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            ); 
        } else {
            toast.error(`${t("COULD_NOT_RUN_PARSING")}: ${res?.error || "Something went wrong"}`)
        }

        setHasStarted(false)
    }

    const launchControls = <div style={{padding: '30px 0', width: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
      <Input
          style={{ width: "100%" }}
          value={parsingName}
          onChange={e => setParsingName(e.target.value)}
      />
      <Button disabled={hasStarted} onClick={sendParsingRequest} type="primary">{t('PARSE')}</Button>
    </div>

    return <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        {launchControls}
        <div style={{marginTop: '30px', fontSize: '15pt' }}>{t('FOLLOWING_GROUPS_WILL_BE_PARSED')}</div>
        <div style={{fontSize: '15pt', fontWeight: '200'}}>
            {
                links.map(link => {
                    return (
                        <div key={link}>
                            <span>{link}</span>
                            <span style={{marginLeft: '5px', color: '#888', fontSize: '13pt', opacity: 0.3}} onClick={() => removeLink(link)}>
                                <DeleteOutlined />
                            </span>
                        </div>
                    )
                })
            }
        </div>
        <div style={{width: '500px', margin: '0 auto'}}>
            <Input addonBefore="t.me/" onPressEnter={e => {
                addLink(e.target.value)
            }} placeholder={t('TYPE_AND_PRESS_ENTER_TO_ADD')} />
        </div>
    </div>

} 

export default Links;