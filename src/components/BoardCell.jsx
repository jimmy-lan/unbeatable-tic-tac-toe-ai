import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  RadioButtonUnchecked as CircleIcon,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: "100%",
    minHeight: 150,
    borderRadius: 0,
    backgroundColor: "#fff",
  },
  // button style to be used for sm devices
  buttonSm: {
    minHeight: 100,
  },
  disabledButton: {},
  hightlightButton: {
    backgroundColor: "#feffc4",
  },
  // circle: {
  //   width: 42,
  //   height: 42,
  //   border: "solid",
  //   borderWidth: 6,
  //   borderColor: "#333",
  //   borderRadius: "50%",
  //   display: "inline-block",
  // },
  icon: {
    width: 72,
    height: 72,
  },
}));

export const BoardCell = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const { cellIndex, handleClick } = props;
  const mark = useSelector((state) => state.game.board[cellIndex]);

  const hightlightNodes = useSelector((state) => state.game.highlightNodes);
  const shouldHighlight = hightlightNodes.includes(cellIndex);

  const renderMark = () => {
    if (mark === "o") {
      return <CircleIcon className={classes.icon} />;
    } else if (mark === "x") {
      return <CloseIcon className={classes.icon} />;
    }
    return <></>;
  };

  return (
    <Grid item xs={4} {...props}>
      <Button
        className={[
          classes.button,
          shouldHighlight ? classes.hightlightButton : undefined,
          isSmDevice ? classes.buttonSm : undefined,
        ]}
        onClick={() => {
          if (!mark) {
            handleClick(cellIndex);
          }
        }}
        disableElevation
      >
        {renderMark()}
      </Button>
    </Grid>
  );
};
