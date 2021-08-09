import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QuizBox from "./QuizBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100vh",
    padding: 26,
    borderRight: "1px solid #cccccc",
  },
  title: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #cccccc",
  },
  container: {
    width: "100%",
    maxHeight: "90vh",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  }
}))

const PageShell = ({
  title,
  question,
  options,
  handleOptionClick,
  generateQuestion,
  handleNextClick,
  endQuiz,
  allQuestions,
  score
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
    <Box className={classes.title}>
      <Typography variant="h3">{title}</Typography>
      {endQuiz ? (
          <Typography variant="h6">
            {`Your Score: ${score}`}
          </Typography>
      ) : (
          <Button
            variant="contained"
              onClick={() => {
                options.length ?
                handleNextClick(title.toLowerCase(), question, options) :
                generateQuestion(title.toLowerCase())
              }}
          >
            {options.length ? "NEXT" : "START"}
          </Button>
      )}
      </Box>
      <Box className={classes.container}>
        {!endQuiz ? (
          <QuizBox
          question={question}
          options={options}
          handleOptionClick={handleOptionClick}
          title={title}
        />
        ) : (
            allQuestions.map((value) => (
              <QuizBox
                question={value.question}
                options={value.options}
                handleOptionClick={handleOptionClick}
                title={title}
                displayAnswer={true}
              />
            ))
        )}
      </Box>
    </Box>
  )
}

export default PageShell;
