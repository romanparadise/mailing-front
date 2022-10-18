import React from 'react';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;


const Mailings = ({ mailingsData }) => {
const { t } = useTranslation()

    return <div style={{ width: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Collapse>
            {
                mailingsData?.map(item => {
                    return <Panel header={item.name} key={item.id}>
                        {
                            Object.keys(item).map(k => {
                                return <p>{t(k.toUpperCase()) + " : " + item[k]}</p>
                            })
                        }
                    </Panel>
                })
            }
        </Collapse>
    </div>

} 

export default Mailings;