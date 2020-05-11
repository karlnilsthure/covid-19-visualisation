import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@material-ui/core";

export const SimpleTable = ({ states }) => {
  const hospitalizedString = (str) => {
    return `Currently hospitalized: ${str}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Positive</TableCell>
            <TableCell align="right">Negative</TableCell>
            <TableCell align="right">New deaths</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {states.map((state, index) => (
            <Tooltip
              title={hospitalizedString(state.hospitalizedCurrently)}
              placement="top"
              arrow
              key={index}
            >
              <TableRow hover>
                <TableCell component="th" scope="row">
                  {state.stateName}
                </TableCell>
                <TableCell align="right">{state.positive}</TableCell>
                <TableCell align="right">{state.negative}</TableCell>
                <TableCell align="right">{state.deathsLastThreeDays}</TableCell>
                <TableCell align="right">{state.death}</TableCell>
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
