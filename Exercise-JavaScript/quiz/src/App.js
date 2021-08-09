import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PageShell from "./components/PageShell"

const operators = ["*", "-", "/", "+"];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%"
  }
}))

const App = () => {
  const classes = useStyles();

  const [allQuestions, setAllQuestions] = React.useState({quiz1: [], quiz2: []});
  const [activeQuestion, setActiveQuestion] = React.useState({quiz1: {}, quiz2: {}});
  const [score, setScore] = React.useState({quiz1: 0, quiz2: 0});
  const [endQuiz, setEndQuiz] = React.useState({quiz1: false, quiz2: false});

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
                    
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

  const generateWrongOptions = (ans) => {
    let num = Math.floor(Math.random() * 90);
    return (num === ans)
      ? generateWrongOptions(ans)
      : {
        value: num,
        correct: false,
        clicked: false
    };
}

  const generateQuestion = (name) => {
    if(endQuiz[name]) return
    const selectedOperator = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 10);
    const operand2 = Math.floor(Math.random() * 10);
    
    if (isFinite(eval(`${operand1 + selectedOperator + operand2}`))) {
      let ans = [{
        value: eval(`${operand1 + selectedOperator + operand2}`),
        correct: true,
        clicked: false
      }]
      while (ans.length < 4) 
        ans.push(generateWrongOptions(eval(`${operand1 + selectedOperator + operand2}`)));

      setActiveQuestion({
        ...activeQuestion,
        [name]: {
          question: `${operand1 + selectedOperator + operand2}`,
          options: shuffleArray(ans)
        }
      })
    } else generateQuestion(name);
  }

  const handleOptionClick = (question, options, option, name) => {
    option.correct && setScore({ ...score, [name]: score[name] ? score[name] + 1 : 1 });
    const filteredOptions = [];
    for (const data of options) {
      if (data.value === option.value)
        filteredOptions.push(option)
      else
        filteredOptions.push(data)
    }
    setAllQuestions({
      ...allQuestions,
      [name]: [...allQuestions[name], {
        question,
        options: filteredOptions
      }]
    });
    if (allQuestions[name].length === 19) {
      setEndQuiz({ ...endQuiz, [name]: true });
      return;
    }
    generateQuestion(name)
  }

  const handleNextClick = (name, question, options) => {
    setAllQuestions({
      ...allQuestions,
      [name]: [...allQuestions[name], {
        question,
        options
      }]
    });
    if (allQuestions[name].length === 19) {
      setEndQuiz({ ...endQuiz, [name]: true });
      return;
    }
    generateQuestion(name)
  }

  return (
    <Box className={classes.root}>
      {Object.keys(activeQuestion).length &&
        Object.keys(activeQuestion).map((screen, index) => (
          <PageShell
            title={screen.toString().toUpperCase()}
            question={activeQuestion[screen].question || ""}
            options={activeQuestion[screen].options || []}
            handleOptionClick={handleOptionClick}
            generateQuestion={generateQuestion}
            handleNextClick={handleNextClick}
            endQuiz={endQuiz[screen]}
            allQuestions={allQuestions[screen]}
            score={`${score[screen]}/${allQuestions[screen].length}`}
          />
      ))}
    </Box>
  )
}

export default App;

