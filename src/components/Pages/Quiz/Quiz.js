import './Quiz.css'
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Question from '../../Question/Question';


const Quiz = ({name, score, questions, setScore }) => {
    const [options, setOptions] = useState() 
    const [currQues, setCurrQues] = useState(0)

    useEffect(() => {
        setOptions(questions && handleShuffle([
            questions[currQues]?.correct_answer,...questions[currQues]?.incorrect_answers
        ]))
    }, [questions, currQues])

    const handleShuffle = (optionss) => {
        return optionss.sort(() => Math.random() - 0.5);
    }
    return (
        <div className='quiz'>
            <span className='subtitle'>Welcome, {name}</span>
            {questions ? (
            <>
                <div className="quizInfo">
                    <span>{questions[currQues].category}</span>
                    <span>Score : {score} </span>
                </div>
                <Question   
                    currQues={currQues}
                    setCurrQues={setCurrQues}
                    questions={questions}
                    options={options}
                    correct={questions[currQues]?.correct_answer}
                    score={score}
                    setScore={setScore}
                    />
                </>
            ) : (
            <CircularProgress style={{margin: 100}} color='primary' size={200} thickness={5}/>)}
        </div>
    )
}
export default Quiz
