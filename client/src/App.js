import React, { useEffect, useState } from "react";
import { SimpleTable } from "./components/Table";
import { Info } from "./components/Info";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    width: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function App() {
  const [states, setStates] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:4000/api/covidData")
      .then((res) => res.json())
      .then((res) => setStates(res));
  }, []);

  return (
    <div className={classes.wrapper}>
      <Info />
      {!!states ? <SimpleTable states={states} /> : <CircularProgress />}
    </div>
  );
}

export default App;
