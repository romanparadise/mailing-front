import axios from "axios";

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const launchMailing = async ({
  name,
  max_messages,
  bots_to_use,
  recepient_groups,
}) => {
  const params = {
    name,
    max_messages,
    bots_to_use,
    recepient_groups,
  };
  // const { data } = await axios.post(
  //     `${process.env.REACT_APP_API_BASE_URL}/launchMailing`,
  //     params
  // );

  await new Promise((res, rej) => {
    setTimeout(() => res(10), 1000);
  });

  const data = choice([
    {
      success: true,
    },
    {
      error: "ERROR DESCRIPTION",
    },
  ]);

  return data;
};

const launchParsing = async ({ name, points, groups }) => {
  const params = {
    name,
    points,
    groups,
  };
  // const { data } = await axios.post(
  //     `${process.env.REACT_APP_API_BASE_URL}/launchParsing`,
  //     params
  // );

  await new Promise((res, rej) => {
    setTimeout(() => res(10), 1000);
  });

  const data = choice([
    {
      success: true,
    },
    {
      error: "ERROR DESCRIPTION",
    },
  ]);

  return data;
};

const fetchBots = async () => {
  // const { data } = await axios.get(
  //     `${process.env.REACT_APP_API_BASE_URL}/bots`
  // );

  await new Promise((res, rej) => {
    setTimeout(() => res(10), 1000);
  });

  const data = [
    {
      name: "fileOne",
      id: "adasndaklsdad",
      amount: 120,
      occupied: true,
    },
    {
      name: "fileTwo",
      id: "adasndaklsssdad",
      amount: 1220,
      occupied: false,
    },
    {
      name: "sdsdsd",
      id: "adasndaklssssssdad",
      amount: 1220,
      occupied: false,
    },
    {
      name: "sdsdsdsdsd",
      id: "adassssndaklsssdad",
      amount: 12200,
      occupied: false,
    },
  ];

  return data;
};

const fetchLogs = async (mailingId) => {
  // Data to post
  const data = {
    id: mailingId,
  };

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    var a;
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // Trick for making downloadable link
      a = document.createElement("a");
      a.href = window.URL.createObjectURL(xhttp.response);
      // Give filename you wish to download
      a.download = "logs.txt";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
    } else {
      throw new Error("SERVER RESPONDED WITH " + xhttp.status);
    }
  };

  xhttp.open("POST", process.env.REACT_APP_API_URL + "/logs");
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.responseType = "blob";
  xhttp.send(JSON.stringify(data));
};

const fetchParsedGroups = async () => {
  // const { data } = await axios.get(
  //     `${process.env.REACT_APP_API_BASE_URL}/parsed`
  // );

  await new Promise((res, rej) => {
    setTimeout(() => res(10), 1000);
  });

  const data = [
    {
      id: "wfdnnsdfkndwksf",
      name: "name",
      amount: 300,
    },
    {
      id: "wwqqw",
      name: "name2",
      amount: 300,
    },
    {
      id: "s;dls;dsd",
      name: "name3",
      amount: 3000,
    },
  ];

  return data;
};

const fetchMailings = async () => {
  // const { data } = await axios.get(
  //     `${process.env.REACT_APP_API_BASE_URL}/mailings`
  // );

  await new Promise((res, rej) => {
    setTimeout(() => res(10), 1000);
  });

  const data = {
    mailings: [
      {
        id: "234v2jvhhbh24bjjk3b4b4h3b4h24244",
        status: "finished",
        bots: ["bots1", "bots2"],
        bots_died: 100,
        bots_used_amount: 200,
        recepients: ["recepient_group_id"],
        started_at: 2378634239946,
        name: "MAILING FOR GAMBLERS",
        amount_sent: 200,
      },
      {
        id: "234v2jvhhbh24b3b4b4h3b4h24244",
        status: "in_progress",
        progress: "80",
        bots: ["bots1", "bots3"],
        bots_died: 100,
        bots_used_amount: 200,
        started_at: 23786342346,
        recepients: ["recepient_group_id"],
        name: "MAILING FOR TAXISTS",
        amount_sent: 21100,
      },
    ],
  };

  return data;
};

export {
  launchMailing,
  launchParsing,
  fetchBots,
  fetchLogs,
  fetchParsedGroups,
  fetchMailings,
};
