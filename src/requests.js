import axios from "axios";

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const launchMailing = async ({
  name,
  max_messages=1000000,
  bots_to_use,
  recipient_groups,
}) => {
  let url = `${process.env.REACT_APP_API_BASE_URL}/launchMailing?name=${name.toString().replaceAll(' ', '_')}&max_messages=${max_messages}`;
  url += `&bots_to_use=${bots_to_use.join(',')}`
  url += `&recipient_groups=${recipient_groups.join(',')}`

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  let data = null

  console.log(url)

  await fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      data = res
    });

  console.log('MAILING LAUNCHED', data)

  return data;
};

const launchParsing = async ({ name, points=[], groups=[] }) => {
  let url = `${process.env.REACT_APP_API_BASE_URL}/launchParsing?name=${name.toString().replaceAll(' ', '_')}`;
  if (groups.length > 0) {
    url += `&groups4parse=${groups.join(',')}`
  }
  if (points.length > 0) {
    points = points.map(i => i.join(':'))
    url += `&points=${points.join(',')}`
  }
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  let data = null

  console.log(url)

  await fetch(url, options)
    .then((response) => response.json())
    .then((res) => {
      data = res
    });

    console.log(data)

    return data;
  };

const fetchBots = async () => {
  const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/bots`
  );

  // await new Promise((res, rej) => {
  //   setTimeout(() => res(10), 1000);
  // });

  // const data = [
  //   {
  //     name: "fileOne",
  //     id: "adasndaklsdad",
  //     amount: 120,
  //     occupied: true,
  //   },
  //   {
  //     name: "fileTwo",
  //     id: "adasndaklsssdad",
  //     amount: 1220,
  //     occupied: false,
  //   },
  //   {
  //     name: "sdsdsd",
  //     id: "adasndaklssssssdad",
  //     amount: 1220,
  //     occupied: false,
  //   },
  //   {
  //     name: "sdsdsdsdsd",
  //     id: "adassssndaklsssdad",
  //     amount: 12200,
  //     occupied: false,
  //   },
  // ];

  console.log("BOTS FETCHED", data)

  return data;
};


const fetchParsedGroups = async () => {
  const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/parsed`
  );

  // await new Promise((res, rej) => {
  //   setTimeout(() => res(10), 1000);
  // });

  // const data = [
  //   {
  //     id: "wfdnnsdfkndwksf",
  //     name: "name",
  //     amount: 300,
  //   },
  //   {
  //     id: "wwqqw",
  //     name: "name2",
  //     amount: 300,
  //   },
  //   {
  //     id: "s;dls;dsd",
  //     name: "name3",
  //     amount: 3000,
  //   },
  // ];

  console.log('frtched parsed groups', data?.groups)

  return data?.groups || [];
};

const fetchMailings = async () => {
  const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/mailings`
  );

  // await new Promise((res, rej) => {
  //   setTimeout(() => res(10), 1000);
  // });

  // const data = {
  //   mailings: [
  //     {
  //       id: "234v2jvhhbh24bjjk3b4b4h3b4h24244",
  //       status: "finished",
  //       bots: ["bots1", "bots2"],
  //       bots_died: 100,
  //       bots_used_amount: 200,
  //       recepients: ["recepient_group_id"],
  //       started_at: 2378634239946,
  //       name: "MAILING FOR GAMBLERS",
  //       amount_sent: 200,
  //     },
  //     {
  //       id: "234v2jvhhbh24b3b4b4h3b4h24244",
  //       status: "in_progress",
  //       progress: "80",
  //       bots: ["bots1", "bots3"],
  //       bots_died: 100,
  //       bots_used_amount: 200,
  //       started_at: 23786342346,
  //       recepients: ["recepient_group_id"],
  //       name: "MAILING FOR TAXISTS",
  //       amount_sent: 21100,
  //     },
  //   ],
  // };

  console.log('fetched mailings', data?.mailings)

  return data?.mailings || [];
};

export {
  launchMailing,
  launchParsing,
  fetchBots,
  fetchParsedGroups,
  fetchMailings,
};
