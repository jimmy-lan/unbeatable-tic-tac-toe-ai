import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { BoardCell } from "../../components/BoardCell";
import { useDispatch, useSelector } from "react-redux";
import { placeMark, aiMove, setCanPlay } from "../../app/gameSlice";

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
  // used to control whether the player can place a chess
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    dispatch(aiMove());
  }, []);

  const handleCellClick = (index) => {
    if (isWaiting) {
      return;
    }

    setIsWaiting(true);
    dispatch(placeMark(index));
    setTimeout(() => {
      dispatch(aiMove());
      setIsWaiting(false);
    }, 1000);
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
