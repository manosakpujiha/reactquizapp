import { Button} from '@mui/material';
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  stateOfTime,
  setStateOfTime,
  timer
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const history = useNavigate();
  console.log('question page render')

  const handleSelect = (i) => {
    // sound
    console.log('hanle select')
    if (selected === i && selected === correct) {
      return "select"}
    else if (selected === i && selected !== correct) {
      return "wrong"}
    else if (i === correct) return "select";
  };
  const handleCheck = (i) => {
    console.log('handleCheck')
   
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  }

  const handleNext = () => {
    console.log('handle next')
    // timer(15).stop()
    if (currQues > 8) {
      setCurrQues(currQues - 1);
      history("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else if (stateOfTime === "Time Left :  00"){ 
      setCurrQues(currQues + 1);
    }
    else {setError("Please select an option first")} ;
  }

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  }
  return (
    <div className="question">
      <h1>Question {currQues + 1} </h1>
      <div className="singleQuestion">
        <h2 dangerouslySetInnerHTML = {{__html: questions[currQues].question}} />
        <div className="options"  >
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => { 
                return (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
                dangerouslySetInnerHTML = {{__html: i}}
              />
            )})}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;