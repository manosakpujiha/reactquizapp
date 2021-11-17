import { Button} from '@mui/material';
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Result.css";

const Result = ({ name, score }) => {
  const history = useNavigate();

  useEffect(() => {
    if (!name) {
      history("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <span className="title">{name} Your Final Score was: {score}</span>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
       Restart Game
      </Button>
    </div>
  );
};

export default Result;
