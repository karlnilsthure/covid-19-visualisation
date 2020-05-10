import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    marginTop: "24px",
    paddingBottom: "8px",
  },
  subtitle: {
    marginBottom: "36px",
  },
});

export const Info = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.header} variant="h1">
        Covid 19
      </Typography>
      <Typography className={classes.subtitle} variant="subtitle1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu
        pretium ipsum. Quisque sit amet risus at risus lacinia elementum at ut
        erat. Aliquam id risus sed neque volutpat dictum.
      </Typography>
    </div>
  );
};
