import axios from 'axios'

function choice(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const launchMailing = async ({name, max_messages, bots_to_use, recepient_groups}) => {
    const params = {
        name,
        max_messages,
        bots_to_use,
        recepient_groups
    }
    // const { data } = await axios.post(
    //     `${process.env.REACT_APP_API_BASE_URL}/launchMailing`,
    //     params
    // );

    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = choice([
        {
            success: true,
        }, 
        {
            error: "ERROR DESCRIPTION"
        }
    ])

    return data
}


const launchParsing = async ({name, points, groups}) => {
    const params = {
        name,
        points,
        groups,
    }
    // const { data } = await axios.post(
    //     `${process.env.REACT_APP_API_BASE_URL}/launchParsing`,
    //     params
    // );

    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = choice([
        {
            success: true,
        }, 
        {
            error: "ERROR DESCRIPTION"
        }
    ])

    return data
}

const fetchBots = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/bots`
    // );

    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = [
        {
            name: "fileOne",
            id: 'adasndaklsdad',
            amount: 120,
            occupied: true,
        },
        {
            name: "fileTwo",
            id: 'adasndaklsssdad',
            amount: 1220,
            occupied: false,
        }
    ]

    return data
}


const fetchLogs = async (mailingId) => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/logs/mailing_id=${mailingId}`
    // );

    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = null

    return data
}

const fetchParsedGroups = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/parsed`
    // );


    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = [
        {
            "id": "wfdnnsdfkndwksf",
            "name": "name",
            "amount": 300,
        }
    ]

    return data
}

const fetchMailings = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/mailings`
    // );

    await new Promise((res, rej) => {
        setTimeout(() => res(10), 1000)
    })

    const data = {
        "mailings": [
            {
                "id": "234v2jvhhbh24bjjk3b4b4h3b4h24244", 
                "status": "finished",
                "bots": ["bots1", "bots2"],
                "started_at": 2378634239946,
                "name": "MAILING FOR GAMBLERS",
                "params": {
                    "parsed_group": 'qd23j323en2j2k3n2323kn',
                },
                "amount_sent": 200
            },
            {
                "id": "234v2jvhhbh24b3b4b4h3b4h24244",
                "status": "in_progress",
                "progress": "80", 
                "bots": ["bots1", "bots3"],
                "started_at": 23786342346, 
                "name": "MAILING FOR TAXISTS",
                "params": { 
                    "parsed_group": 'qd23j323en2j2k3n2323kn',
                },
                "amount_sent": 200
            }
        ]
    }

    return data
}

export {
    launchMailing,
    launchParsing,
    fetchBots,
    fetchLogs,
    fetchParsedGroups,
    fetchMailings
}