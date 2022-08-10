import React from 'react'

export default function Letters(props) {
    const letterBtns = [];
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    for (const letter of ALPHABET) {
      letterBtns.push(
        <button
          type="button"
          className='letter-button'
          key={letter}
          disabled={props.disableAll || props.guessedLetters.includes(letter)}
          onClick={() => props.handleGuessLetter(letter)}
        >
          {letter}
        </button>,
      );
    }
  
    return (
        <section className="letter-buttons">{letterBtns}</section>
    )
}
