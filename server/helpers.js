const replaceNullValuesWithNA = (obj) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value === null) {
      value = "N/A";
    }
  });
  return obj;
};

const removeUnusedData = (state) => {
  return {
    state: state.state,
    positive: state.positive,
    negative: state.negative,
    death: state.death,
    hospitalizedCurrently: state.hospitalizedCurrently,
  };
};

const getDeathsLastThreeDays = (stateHistoryArray) => {
  const deathsCurrentDate = stateHistoryArray.data[0].death;
  const deathsFourDaysAgo = stateHistoryArray.data[3].death;
  return deathsCurrentDate - deathsFourDaysAgo;
};
