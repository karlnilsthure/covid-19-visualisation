const express = require("express");
const axios = require("axios");

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
    const allStates = await axios.get(
      "https://covidtracking.com/api/v1/states/current.json"
    );

    const getStateUrlArray = allStates.data.map((state) => {
      return `https://covidtracking.com/api/v1/states/${state.state}/daily.json`;
    });

    const statesWithHistory = await axios.all(
      getStateUrlArray.map((url) => axios.get(url))
    );

    const extractedStates = statesWithHistory.map(({ data }) => {
      return { data };
    });

    const firstState = extractedStates[0];

    const filteredStates = allStates.data.map(
      ({ state, positive, negative, death, hospitalizedCurrently }) => {
        return { state, positive, negative, death, hospitalizedCurrently };
      }
    );

    const removeNulls = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] === null) {
          obj[key] = "N/A";
        }
      });
      return obj;
    };

    const removedNulls = filteredStates.map((state) => {
      return removeNulls(state);
    });

    res.send(removedNulls);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
