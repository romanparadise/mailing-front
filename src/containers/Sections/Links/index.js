import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useTranslation } from 'react-i18next';




const Links = () => {
    const {t} = useTranslation()

    const [ links, setLinks ] = useState([])
  
    const addLink = link => setLinks(prevLinks => (prevLinks.includes(link) || !link) ? prevLinks : [...prevLinks, link])
  
    const removeLink = link => setLinks(prevLinks => prevLinks.filter(l => l !== link))
  

    const launchControls = <div style={{padding: '30px 0', width: '500px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row'}}>
        <Input
            style={{ width: "100%" }}
            defaultValue={'Group parsing - ' + Date().toString().split('GMT')[0]}
        />
        <Button type="primary">{t('PARSE')}</Button>
      </div>

    return <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        {launchControls}
        <div>{t('FOLLOWING_GROUPS_WILL_BE_PARSED')}</div>
        <div style={{fontSize: '15pt', fontWeight: '200'}}>
            {
                links.map(link => {
                    return (
                        <div>
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
            <Input onPressEnter={e => {
                addLink(e.target.value)
            }} placeholder={t('TYPE_AND_PRESS_ENTER_TO_ADD')} />
        </div>
    </div>

} 

export default Links;