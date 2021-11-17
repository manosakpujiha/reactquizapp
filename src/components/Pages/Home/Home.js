
import './Home.css'
import { Button, MenuItem, TextField } from '@mui/material';
import Categories from '../../../Data/Categories.js';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const Home = ({name, setName, fetchQuestions, sound}) => {
    const [category, setCategory] = useState(18);
    const [difficulty, setDifficulty] = useState('easy');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    console.log('home page render')

    function handleSubmit() {
        if (!category || !difficulty || !name) {
            setError(true);
            return;
        }
        else {
            setError(false);
            fetchQuestions(category, difficulty);
            sound.call()
            navigate('/quiz');
        }
    }

    return (
        <div className='content'>
            <div className='settings'>
                <span style={{fontSize:30}}>Settings</span>
                <div className='settings__select'>
                    {error && <ErrorMessage>Please Fill all the Fields!</ErrorMessage>}
                    <TextField
                        style={{ marginBottom: 25 }}
                        label="Enter Your Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        select
                        label="Select Category"
                        variant="outlined"
                        style={{ marginBottom: 30}}
                        onChange={(e) => setCategory(e.target.value)}
                        value = {category}
                    >
                        {Categories.map((cat) => (<MenuItem key={cat.category} value={cat.value}>{cat.category}</MenuItem>))}
                    </TextField>
                    <TextField
                        select
                        label="Select Difficulty"
                        variant="outlined"
                        style={{ marginBottom: 30 }}
                        onChange={(e) => setDifficulty(e.target.value)}
                        value = {difficulty}
                    >
                        <MenuItem key="Easy" value="easy">
                        Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium">
                        Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard">
                        Hard
                        </MenuItem>
                    </TextField>
                    <Button variant='contained' color='primary' size='large'  onClick={handleSubmit}>Start Quiz</Button>
                </div>
            </div>
            <img src="/home.png" className="banner" alt="quiz img"></img>
        </div>
    )
}

export default Home
