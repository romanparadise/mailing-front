import { Checkbox, Input, Button } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";


const F = ({bots, parsedGroups, selectedBots, selectedGroups, setSelectedBots, setSelectedGroups}) => {
  //   bots = [{
  //     name: 'bots1',
  //     occupied: true,
  //     amount: '11'
  // },
  // {
  //     name: 'bots2',
  //     occupied: false,
  //     amount: '121'
  // },
  // {
  //     name: 'bots3',
  //     occupied: false,
  //     amount: '121'
  // },
  // {
  //     name: 'bots4',
  //     occupied: false,
  //     amount: '121'
  // },
  // {
  //     name: 'bots5',
  //     occupied: false,
  //     amount: '121'
  // }]
  // parsedGroups = [{
  //     name: 'dhhdkhdd',
  //     amount: 1222
  // },
  // {
  //     name: 'dhhdk0000hdd',
  //     amount: 12221
  // },
  // {
  //     name: 'dhhdk00ksknkshdd',
  //     amount: 12221
  // },
  // {
  //     name: 'dd99hhdk0000hdd',
  //     amount: 12221
  // }
  // ]
    const { t } = useTranslation();

    const parsedData = useMemo(() => {
      let reducedParsedGroups = []
      parsedGroups.forEach(element => {
        if (reducedParsedGroups.map(i => i.name).includes(element.name)) {
          const thisOne = reducedParsedGroups.find(i => i.name === element.name)

          thisOne.amout += element.amout
          thisOne.ids.push(element.id)
        } else {
          reducedParsedGroups.push({
            ids: [element.id],
            amout: element.amout,
            name: element.name
          })
        }
      });

      return reducedParsedGroups

    }, [parsedGroups?.map(p => p.id).join(' ')])

    return (
        <div
          style={{
            width: "fit-content",
            margin: "auto auto",
            display: "flex",
            color: "#fff",
            textAlign: 'left',
            borderBottom: '1px solid #eeeeee',
            // borderTop: '1px solid #eee'
          }}
        >
          <div className="check-items">
            <div style={{fontSize: '14pt', 
                // borderBottom: '1px solid #e8e8e8',
                width: 'fit-content',
                marginBottom: '5px'
                }}>{t("SELECT_BOTS")}</div>
            <Checkbox.Group
            value={selectedBots}
              options={bots?.map((botGroup) => {
                return {
                  label: <div style={{margin: '1px'}}><span>{botGroup.name}</span> <span className="amount" style={{color: '#1890ff'}}>{botGroup.amount}</span></div>,
                  value: botGroup.name,
                  disabled: botGroup.occupied,
                };
              })}
              onChange={(bots) => {
                setSelectedBots(bots);
              }}
            />
          </div>

          <div className="check-items">
          <div style={{fontSize: '14pt', 
                //   borderBottom: '1px solid #e8e8e8',
                width: 'fit-content',
                marginBottom: '5px'
                }}>{t("SELECT_PARSED_BATCHES")}</div>

            <Checkbox.Group
            value={Array.from(new Set(selectedGroups?.map(g => g.split(' ')[1])))}
              options={parsedData?.map((g) => {
                return {
                  label: (
                    <div style={{margin:'1px'}}>
                      <span>{g.name}</span> <span className="amount" style={{color: '#1890ff'}}>{g.amout}</span>
                    </div>
                  ),
                  value: g.name,
                };
              })}
              onChange={(groups) => {
                const ids = []
                parsedData.forEach(i => {
                  if (!groups.includes(i.name)) return 
                  
                  ids.push(...i.ids)
                })

                setSelectedGroups(ids);
              }}
            />
          </div>
        </div>
    )
}

export default F