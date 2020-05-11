const express = require("express");
const { getStatesDataFromCovidTracking } = require("./covidTracking.js");
const {
  formatData,
  getDeathsLastThreeDays,
  addDeathsToStatesArray,
} = require("./helpers.js");

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.get("/api/covidData", async (req, res) => {
  try {
    const {
      statesCurrent,
      statesWithHistory,
    } = await getStatesDataFromCovidTracking();

    const deathLastThreeDays = getDeathsLastThreeDays(statesWithHistory);
    const formatedData = formatData(statesCurrent.data);

    const finalData = addDeathsToStatesArray(formatedData, deathLastThreeDays);

    res.send(finalData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
