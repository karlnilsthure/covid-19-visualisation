import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function App() {
  const [states, setStates] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/covidData")
      .then((res) => res.json())
      .then((res) => setStates(res));
  }, []);

  if (!states) return null;

  return (
    <div style={{ maxWidth: "800px" }}>
      <SimpleTable states={states} />
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SimpleTable = ({ states }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Positive</TableCell>
            <TableCell align="right">Negative</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states.map((state, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {state.state}
              </TableCell>
              <TableCell align="right">{state.positive}</TableCell>
              <TableCell align="right">{state.negative}</TableCell>
              <TableCell align="right">{state.death}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
