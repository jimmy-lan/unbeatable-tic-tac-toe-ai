import React from "react";
import { Paper, Button, makeStyles, Snackbar, Slide } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Board } from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { resetBoard } from "../app/gameSlice";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  snackbar: {
    marginBottom: 30,
  },
});

export const PlayingArea = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameComplete = useSelector((state) => state.game.gameComplete);
  const canPlay = useSelector((state) => state.game.canPlay);

  const handleReset = () => {
    dispatch(resetBoard());
  };

  const TransitionUp = (props) => <Slide {...props} direction="up" />;

  return (
    <Paper className={classes.root} elevation={0}>
      <Board />
      <Button variant="outlined" color="primary" onClick={handleReset}>
        Reset Board
      </Button>
      <Snackbar
        open={!canPlay && !gameComplete}
        TransitionComponent={TransitionUp}
        key={TransitionUp.name}
        className={classes.snackbar}
      >
        <Alert elevation={6} variant="filled" severity="info">
          Waiting for AI player...
        </Alert>
      </Snackbar>
    </Paper>
  );
};
