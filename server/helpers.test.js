const {
  replaceNullValuesWithNA,
  removeUnusedData,
  mapAbbreviationToStateName,
  getDeathsLastThreeDays,
  addDeathsToStatesArray,
} = require("./helpers.js");

describe("replaceNullValuesWithNA", () => {
  const mockState = {
    mock1: null,
    mock2: "mock2",
  };

  const expectedResult = {
    mock1: "N/A",
    mock2: "mock2",
  };

  const result = replaceNullValuesWithNA(mockState);

  it("should replace null values with the string 'N/A'", () => {
    expect(result).toEqual(expectedResult);
  });
});

describe("removeUnusedData", () => {
  const mockState = {
    state: "CA",
    positive: 0,
    negative: 0,
    death: 0,
    hospitalizedCurrently: 0,
    mockKey: "mockValue",
  };

  const expectedResult = {
    state: "CA",
    positive: 0,
    negative: 0,
    death: 0,
    hospitalizedCurrently: 0,
  };

  const result = removeUnusedData(mockState);

  it("should return return the 5 specific properties from each state", () => {
    expect(result).toEqual(expectedResult);
  });
});

describe("mapAbbreviationToStateName", () => {
  const mockState = {
    state: "MO",
    positive: 0,
    negative: 0,
    death: 0,
    hospitalizedCurrently: 0,
  };

  const mockStatesJSON = {
    AK: "Alaska",
    MO: "Mock",
  };

  const expectedResult = {
    state: "MO",
    stateName: "Mock",
    positive: 0,
    negative: 0,
    death: 0,
    hospitalizedCurrently: 0,
  };

  const result = mapAbbreviationToStateName(mockStatesJSON, mockState);

  it("should add the correct state name that matches the abbreviation to the state object", () => {
    expect(result).toEqual(expectedResult);
  });
});

describe("getDeathsLastThreeDays", () => {
  const mockStateWithHistory = [
    {
      data: [
        {
          state: "MO",
          death: 10,
        },
        {
          state: "MO",
          death: 7,
        },
        {
          state: "MO",
          death: 5,
        },
        {
          state: "MO",
          death: 3,
        },
      ],
    },
  ];

  const expectedResult = [
    {
      state: "MO",
      deathsLastThreeDays: 7,
    },
  ];

  const result = getDeathsLastThreeDays(mockStateWithHistory);

  it("should calculate the number of deaths from the last three days", () => {
    expect(result).toEqual(expectedResult);
  });
});

describe("addDeathsToStatesArray", () => {
  const mockDeathsLastThreeDays = [
    {
      state: "MO",
      deathsLastThreeDays: 7,
    },
    {
      state: "ME",
      deathsLastThreeDays: 0,
    },
  ];

  const mockStateArray = [
    {
      state: "ME",
      stateName: "Meck",
      positive: 0,
      negative: 0,
      death: 0,
      hospitalizedCurrently: 0,
    },
    {
      state: "MO",
      stateName: "Mock",
      positive: 0,
      negative: 0,
      death: 0,
      hospitalizedCurrently: 0,
    },
  ];

  const expectedResult = [
    {
      state: "ME",
      stateName: "Meck",
      positive: 0,
      negative: 0,
      death: 0,
      hospitalizedCurrently: 0,
      deathsLastThreeDays: 0,
    },
    {
      state: "MO",
      stateName: "Mock",
      positive: 0,
      negative: 0,
      death: 0,
      hospitalizedCurrently: 0,
      deathsLastThreeDays: 7,
    },
  ];

  const result = addDeathsToStatesArray(
    mockStateArray,
    mockDeathsLastThreeDays
  );

  it("should add 'deathsLastThreeDays' to the correct state object", () => {
    expect(result).toEqual(expectedResult);
  });
});
