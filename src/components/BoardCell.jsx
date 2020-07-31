import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useSelector } from "react-redux";

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

  const { cellIndex, handleClick } = props;
  const mark = useSelector((state) => state.game.board[cellIndex]);

  const renderMark = () => {
    if (mark === "o") {
      return <span className={classes.circle} />;
    } else if (mark === "x") {
      return <CloseIcon className={classes.close} />;
    }
    return <></>;
  };

  return (
    <Grid item xs={4} {...props}>
      <Button
        className={classes.button}
        onClick={() => handleClick(cellIndex)}
        disableElevation
      >
        {renderMark()}
      </Button>
    </Grid>
  );
};
