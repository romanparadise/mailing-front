import React from "react";
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const colors = ['rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',]

const Card = ({title, text, color}) => {
  const {t} = useTranslation()
    return <div>
        <div style={{ textAlign: 'left'}}>{t(title)}</div>
        <div style={{ borderLeft: `solid 2px ${color}`, fontSize: '12pt', color: '#888', fontWeight: '400', textAlign: 'justify', padding: '10px 10px', marginBottom: '50px' }}>{t(text)}</div>
    </div>
}

const cards = [
  {
    id: 1,
    title: 'HOW_TO_START_MAILING',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
  {
    id: 2,
    title: 'HOW_TO_SEE_MAILING_STATS',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
  {
    id: 3,
    title: 'HOW_TO_UPLOAD_BOTS',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
  {
    id: 4,
    title: 'HOW_TO_REGISTER_NEW_BOTS',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
  {
    id: 5,
    title: 'HOW_TO_PARSE_USERS',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
  {
    id: 6,
    title: 'HOW_TO_INVITE_TO_GROUP',
    text: 'DESCRIPTION_IS_IN_DEVELOPMENT',
  },
]

const App = () => {

  return (
    <div>
      {
        cards.map((c, ind) => <Card title={c.title} text = {c.text} color={colors[ind % colors.length]} />)
      }
    </div>
  );
};

export default App;
