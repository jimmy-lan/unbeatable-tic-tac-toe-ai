import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: "100%",
    minHeight: 150,
    borderRadius: 0,
    backgroundColor: "#fff",
  },
  circle: {
    width: 42,
    height: 42,
    border: "solid",
    borderWidth: 6,
    borderColor: "#333",
    borderRadius: "50%",
    display: "inline-block",
  },
  close: {
    width: 72,
    height: 72,
  },
}));

export const BoardCell = (props) => {
  const classes = useStyles();

  const { mark } = props;

  const renderMark = () => {
    if (mark === "circle") {
      return <span className={classes.circle} />;
    } else if (mark === "cross") {
      return <CloseIcon className={classes.close} />;
    }
    return <></>;
  };

  return (
    <Grid item xs={4} {...props}>
      <Button className={classes.button} disableElevation>
        {renderMark()}
      </Button>
    </Grid>
  );
};
