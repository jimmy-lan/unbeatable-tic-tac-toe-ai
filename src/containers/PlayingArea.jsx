import React from "react";
import {
  Paper,
  Button,
  makeStyles,
  Snackbar,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Board } from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { setMaximizing, resetBoard } from "../app/gameSlice";

const useStyles = makeStyles((theme) => ({
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
  controlPane: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export const PlayingArea = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameComplete = useSelector((state) => state.game.gameComplete);
  const canPlay = useSelector((state) => state.game.canPlay);
  const isMaximizing = useSelector((state) => state.isMaximizing);

  const handleOrderSelectChange = (event) => {
    dispatch(setMaximizing(event.target.value));
    dispatch(resetBoard());
  };

  const handleReset = () => {
    dispatch(resetBoard());
  };

  const TransitionUp = (props) => <Slide {...props} direction="up" />;

  return (
    <Paper className={classes.root} elevation={0}>
      <Board />
      <div className={classes.controlPane}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="order-select-outlined-label">Order</InputLabel>
          <Select
            labelId="order-select-outlined-label"
            id="order-select-outlined"
            value={isMaximizing}
            onChange={handleOrderSelectChange}
            label="Order"
          >
            <MenuItem value={true}>AI goes first</MenuItem>
            <MenuItem value={false}>You go first</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReset}
          size="large"
        >
          Reset Board
        </Button>
      </div>
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
