import React from "react";
import { BoardCell } from "../../components/BoardCell";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    background: "#f0f0f0",
    maxWidth: 450 + theme.spacing(2),
  },
  boardRow: {
    margin: "0 4px",
    padding: 2,
  },
}));

const BoardRow = (props) => {
  return (
    <Grid container item direction="row" xs={12} spacing={1} {...props}>
      <BoardCell />
      <BoardCell />
      <BoardCell />
    </Grid>
  );
};

export const Board = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <BoardRow className={classes.boardRow} />
        <BoardRow className={classes.boardRow} />
        <BoardRow className={classes.boardRow} />
      </Grid>
    </div>
  );
};
