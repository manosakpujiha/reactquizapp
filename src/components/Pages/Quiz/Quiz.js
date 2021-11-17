import './Quiz.css'
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Question from '../../Question/Question';
import clockTick from '../../../sounds/clockbeep.wav';
import fail from '../../../sounds/fail.mp3';

const Quiz = ({name, score, questions, setScore, clickSound}) => {
    const [options, setOptions] = useState()
    const [currQues, setCurrQues] = useState(0)
    const [stateOfTime, setStateOfTime] = useState()
    console.log('quiz page render')

    const playSound = (sound) => new Audio(sound).play()
   



   


   

    useEffect(() => {
        setOptions(questions && handleShuffle([
            questions[currQues]?.correct_answer,...questions[currQues]?.incorrect_answers
        ]))
    }, [questions, currQues])
    
    
        function timer(time) {
            console.log('timer function')
            let counter = setInterval(startTimer, 1000);

            function stopTimer() {
                console.log('timer has stopped')
                clearInterval(counter);
                
            }
            
            function startTimer() { 
                console.log('timer has started by click')
                let countDownTimer =  document.querySelector(".time-left");
                let op =  document.querySelectorAll(".singleOption");
                if (currQues > 9) {
                    stopTimer() 
                    
                } else {
                   playSound(clockTick)
                    countDownTimer.textContent =   time; 
                    time--; //decrement the time value
                    console.log(currQues)
                    
                    for (let i = 0; i < op.length; i++) {
                        if (op[i].classList.contains("select") === true ) {
                            console.log('found class select, stop timer')
                            stopTimer()
                        } 
                    
                    }


                    let addZero = countDownTimer.textContent; 
                    if(time < 9) { //if timer is less than 9
                        countDownTimer.textContent = "Time Left :  0" + addZero; //add a 0 before time value
                    } else {
                        countDownTimer.textContent = "Time Left : " + addZero; //add a 0 before time value
                    }
                    // if (true) {
                    //     stopTimer()
                    // }
                    if(time < 0){ //if timer is less than 0
                        stopTimer() //clear counter
                        // playAudioFail();
                        setStateOfTime(countDownTimer.textContent)
                    
                        for (let i = 0; i < op.length; i++) {
                            if (questions[currQues].correct_answer === op[i].innerHTML ) {
                                op[i].classList.add("select");
                            } 
                            op[i].disabled = true;
                            playSound(fail)
                            
                        }
                
                    }
                }
            }
           

            return {
                start: startTimer,
                stop: stopTimer
            };
            
        }

   
        const handleShuffle = (optionss) => {
            clickSound.call()
            console.log('handle shuffle')
            timer(15).start()
            return optionss.sort(() => Math.random() - 0.5);
        }
    
      
    
    return (
        <div className='quiz'>
            <span className='subtitle'>Welcome, {name}</span>
            <span className='time-left'>0</span>
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
                    setStateOfTime={setStateOfTime}
                    stateOfTime = {stateOfTime}
                    timer ={timer}
                    />
                </>
            ) : (
            <CircularProgress style={{margin: 100}} color='primary' size={200} thickness={5}/>)}
        </div>
    )
}
export default Quiz
