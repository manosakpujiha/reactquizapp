import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Quiz from './components/Pages/Quiz/Quiz';
import Result from './components/Pages/Result/Result';
import click from './sounds/click2.mp3';




function clickSound() {
  new Audio(click).volume = 0.1;
  new Audio(click).play();
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
          <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} clickSound={clickSound}  />}>
          </Route>
          <Route path='/quiz' element={<Quiz name={name} score={score} questions={questions} setScore ={setScore} clickSound={clickSound}/>}>
          </Route>
          <Route path='/result' element={<Result name={name} score={score} clickSound={clickSound}/>} >
          </Route>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
