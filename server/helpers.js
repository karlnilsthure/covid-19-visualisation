const statesJSON = require("./states.json");

const replaceNullValuesWithNA = (state) => {
  Object.keys(state).forEach((key) => {
    if (state[key] === null) {
      state[key] = "N/A";
    }
  });
  return state;
};

const removeUnusedData = ({
  state,
  positive,
  negative,
  death,
  hospitalizedCurrently,
}) => {
  return {
    state,
    positive,
    negative,
    death,
    hospitalizedCurrently,
  };
};

const mapAbbreviationToStateName = (statesJSONfile, state) => {
  return {
    ...state,
    stateName: statesJSONfile[state.state],
  };
};

const formatData = (statesArray) => {
  return statesArray
    .map((state) => removeUnusedData(state))
    .map((state) => replaceNullValuesWithNA(state))
    .map((state) => mapAbbreviationToStateName(statesJSON, state));
};

const getDeathsLastThreeDays = (statesWithHistory) => {
  const result = statesWithHistory.map((stateArray) => {
    const deathsCurrentDate = stateArray.data[0].death;
    const deathsFourDaysAgo = stateArray.data[3].death;
    const deathsLastThreeDays = deathsCurrentDate - deathsFourDaysAgo;
    const state = stateArray.data[0].state;
    return { state, deathsLastThreeDays };
  });

  return result;
};

const addDeathsToStatesArray = (statesArray, deathsArray) => {
  let result = [];
  statesArray.forEach((state) => {
    deathsArray.forEach((death) => {
      if (state.state === death.state) {
        result.push({
          ...state,
          deathsLastThreeDays: death.deathsLastThreeDays,
        });
      }
    });
  });

  return result;
};

module.exports = {
  replaceNullValuesWithNA,
  removeUnusedData,
  mapAbbreviationToStateName,
  formatData,
  getDeathsLastThreeDays,
  addDeathsToStatesArray,
};
