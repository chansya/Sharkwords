import React from 'react'

export default function Word(props) {
    const charDivs = [];
    for (const [i, letter] of Object.entries(props.word)) {
      let displayLetter = null;
      if (props.guessedLetters.includes(letter)) {
        displayLetter = letter;
      }
  
      charDivs.push(
        <div key={i} className="letter-box">
          {displayLetter}
        </div>,
      );
    }
    return (
        <section className="word-container">
        {charDivs}
        </section>
    )
}
