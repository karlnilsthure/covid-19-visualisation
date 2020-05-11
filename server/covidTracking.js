const axios = require("axios");

const getStatesDataFromCovidTracking = async () => {
  const statesCurrent = await axios.get(
    "https://covidtracking.com/api/v1/states/current.json"
  );

  const urlForEachState = statesCurrent.data.map((state) => {
    return `https://covidtracking.com/api/v1/states/${state.state}/daily.json`;
  });

  const statesWithHistoryRaw = await Promise.all(
    urlForEachState.map((url) => axios.get(url))
  );

  const statesWithHistory = statesWithHistoryRaw.map(({ data }) => {
    return { data };
  });

  return { statesCurrent, statesWithHistory };
};

module.exports = { getStatesDataFromCovidTracking };
