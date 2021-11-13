import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Quiz from './components/Pages/Quiz/Quiz';
import Result from './components/Pages/Result/Result';


function App() {
  const [name, setName] = useState('manos');
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
      // console.log( data.results, data, name)
    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="App" style={{backgroundImage: "url(./ques1.png)"}}>
        <Header/> 
        <Routes>
          <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>}>
          </Route>
          <Route path='/quiz' element={<Quiz name={name} score={score} questions={questions} setScore = {setScore}/>}>
          </Route>
          <Route path='/result' element={<Result name={name} score={score}/>} >
          </Route>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
