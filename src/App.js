import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Quiz from './components/Pages/Quiz/Quiz';
import Result from './components/Pages/Result/Result';
import clickSound from './sounds/click2.mp3';
import briefingSound from './sounds/also briefing.mp3';


let sound = new Audio(clickSound);
let sound2 = new Audio(briefingSound);
function backgroundSound() {
  sound2.volume = 0.1;
  sound2.play();
}
function playSound() {
  sound.volume = 0.1;
  sound.play();
}

function App() {
  const [name, setName] = useState('Guest');
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };

  

  return (
    <BrowserRouter>
      <div className="App">
        <Header/> 
        <Routes>
          <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} sound={playSound, backgroundSound}/>}>
          </Route>
          <Route path='/quiz' element={<Quiz name={name} score={score} questions={questions} setScore = {setScore} sound={playSound}/>}>
          </Route>
          <Route path='/result' element={<Result name={name} score={score} sound={playSound}/>} >
          </Route>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
