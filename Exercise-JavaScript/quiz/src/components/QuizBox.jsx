import React from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 420,
    height: "fit-content",
    padding: 16,
    margin: "16px auto",
    border: "1px solid #cccccc",
    borderRadius: 8
  },
  options: {
    display: "flex",
    justifyContent: "center"
  },
  cell: {
    padding: 16,
    margin: 16,
    border: "1px solid #cccccc",
    borderRadius: 8,
    cursor: "pointer"
  },
  wrong: {
    backgroundColor: "#ff9999"
  },
  correct: {
    backgroundColor: "#ccffcc"
  },
  correctV2: {
    backgroundColor: "#00ff55"
  }
}))

const QuizBox = ({question, options=[], handleOptionClick, title, displayAnswer=false}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" align="center"> {question} </Typography>
      <Box className={classes.options}>
      {options.map((option, index) => (
        <Typography
          key={index}
          variant="h6"
          className={classNames(classes.cell, {
            [classes.wrong]: option.clicked && !option.correct,
            [classes.correct]: option.clicked && option.correct,
            [classes.correctV2]: displayAnswer && option.correct && !option.clicked
          })}
          onClick={() => handleOptionClick(
            question,
            options,
            { ...option, clicked: true },
            title.toLowerCase()
          )}
        >
          {`${option.value.toFixed(2)}`}
        </Typography>
      ))}
       </Box>
    </Box>
  )
}

export default QuizBox;
