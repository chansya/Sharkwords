import { useState, useEffect } from 'react';
import Word from './components/Word';
import Letters from './components/Letters';
// styles
import './App.css';

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [numWrong, setNumWrong] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [randWord, setRandWord] = useState('')
  const hasWon = numCorrect === randWord.length;
  const hasLost = numWrong > 4;

  const getRandomWord = () =>{
    fetch('https://random-words-api.vercel.app/word/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // setRandWord(data[0]['word'].toLowerCase())
      // setRandWord(data[0])
      setRandWord("journey")
    })
  }

  useEffect(()=>{
    getRandomWord()
  }, [])

  const guessLetter = (guessedLetter) => {
    if (!randWord.includes(guessedLetter)) {
      setNumWrong((currentNumWrong) => currentNumWrong + 1);
    } else {
      for (const letter of randWord) {
        if (letter === guessedLetter) {
          setNumCorrect((currentNumCorrect) => currentNumCorrect + 1);
        }
      }
    }

    setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);
  };

  const resetGame = () => {
    setGuessedLetters(() => []);
    setNumCorrect(() => 0);
    setNumWrong(() => 0);
    getRandomWord();
  }

  return (
    <div>
      <h1>Sharkwords</h1>
      <div className='shark-images'>
        <img src={`/img/guess${numWrong}.png`} alt={`${numWrong}-guesses-wrong`} />
      </div>
      {hasWon ? (
        <button
        className='reset-button'
        onClick={() => resetGame()}
        >
          Congratulations! 🥳 You won! Click here to play again.
        </button>
      ) : null}
      {hasLost ? (
        <button
        className='reset-button'
        onClick={() => resetGame()}
        >
          The Shark got you! The word was {randWord}. <br></br> Click here to play again.
        </button>
      ) : null}

      <Word word={randWord} guessedLetters={guessedLetters} />
      <Letters
        guessedLetters={guessedLetters}
        handleGuessLetter={guessLetter}
        disableAll={hasWon || hasLost}
      />
    </div>
  );
}


export default App;
