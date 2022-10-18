import axios from 'axios'

const launchMailing = async (name, max_messages, bots_to_use) => {
    const params = {
        name,
        max_messages,
        bots_to_use
    }
    // const { data } = await axios.post(
    //     `${process.env.REACT_APP_API_BASE_URL}/launchMailing`,
    //     params
    // );

    const data = "some_id"

    return data
}


const launchParsing = async (name, points, groups, circles) => {
    const params = {
        name,
        points,
        groups,
        circles
    }
    // const { data } = await axios.post(
    //     `${process.env.REACT_APP_API_BASE_URL}/launchParsing`,
    //     params
    // );

    const data = "some_id"

    return data
}

const fetchBots = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/bots`
    // );

    const data = [
        {
            name: "fileOne",
            id: 'adasndaklsdad',
            amount: 120,
            occupies: true,
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

const fetchProxies = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/proxies`
    // );

    const data = {
        amount: 1000
    }

    return data
}

const fetchProgress = async (mailingId) => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/progress/mailing_id=${mailingId}`
    // );

    const data = {
        "sentAmount": 10431,
        "botsDied": 100,
        "botsAlive": 300,
    }

    return data
}

const fetchLogs = async (mailingId) => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/logs/mailing_id=${mailingId}`
    // );

    const data = null

    return data
}

const fetchParsedGroups = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/parsed`
    // );

    const data = [
        {
            "id": "wfdnnsdfkndwksf",
            "name": "",
            "amount": 300,
        }
    ]

    return data
}

const fetchMailings = async () => {
    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/mailings`
    // );

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
    fetchProxies,
    fetchProgress,
    fetchLogs,
    fetchParsedGroups,
    fetchMailings
}