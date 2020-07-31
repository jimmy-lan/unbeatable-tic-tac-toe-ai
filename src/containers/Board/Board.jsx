import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { BoardCell } from "../../components/BoardCell";
import { useDispatch } from "react-redux";
import { placeMark } from "../../app/gameSlice";

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
  const { cellIndices, handleCellClick } = props;
  return (
    <Grid container item direction="row" xs={12} spacing={1} {...props}>
      <BoardCell handleClick={handleCellClick} cellIndex={cellIndices[0]} />
      <BoardCell handleClick={handleCellClick} cellIndex={cellIndices[1]} />
      <BoardCell handleClick={handleCellClick} cellIndex={cellIndices[2]} />
    </Grid>
  );
};

export const Board = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCellClick = (index) => {
    dispatch(placeMark(index));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <BoardRow
          className={classes.boardRow}
          handleCellClick={handleCellClick}
          cellIndices={[0, 1, 2]}
        />
        <BoardRow
          className={classes.boardRow}
          handleCellClick={handleCellClick}
          cellIndices={[3, 4, 5]}
        />
        <BoardRow
          className={classes.boardRow}
          handleCellClick={handleCellClick}
          cellIndices={[6, 7, 8]}
        />
      </Grid>
    </div>
  );
};
