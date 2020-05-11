import React from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    marginTop: "24px",
    paddingBottom: "8px",
  },
  subtitle: {
    marginBottom: "36px",
  },
  link: {
    cursor: "pointer",
  },
});

export const Info = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.header} variant="h1">
        Covid 19
      </Typography>
      <div className={classes.subtitle}>
        <Typography variant="subtitle1">
          This is a representation of data from{" "}
          <Link
            className={classes.link}
            target="_blank"
            href="https://covidtracking.com/api"
          >
            "The covid tracking project"
          </Link>
          .
        </Typography>
        <Typography variant="subtitle1">
          <strong>New deaths</strong> displays the number of deaths during the
          last three days.
        </Typography>
        <Typography variant="subtitle1">
          <strong>Deaths</strong> displays the number total number if deaths in
          the state, so far.
        </Typography>
      </div>
    </div>
  );
};
