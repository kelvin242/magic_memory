import React, { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: 'img/helmet-1.png', matched: false },
  { src: 'img/potion-1.png', matched: false },
  { src: 'img/ring-1.png', matched: false },
  { src: 'img/scroll-1.png', matched: false },
  { src: 'img/shield-1.png', matched: false },
  { src: 'img/sword-1.png', matched: false },
]

const App = () => {
  // initialise state
  const [cards, setcards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle card
  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      // shufflecards in a random order
      .sort(() => Math.random() - 0.5)
      // add an id value to each card
      .map((card) => {
        return { ...card, id: Math.random() }
      })
    setChoiceOne(null)
    setChoiceTwo(null)
    setcards(shuffledCards)
    setTurns(0)
  }

  // handleChoice
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setcards((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiceTwo.src) {
              // we could as well use choiceOne.src
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        reset()
      } else {
        setTimeout(() => {
          reset()
        }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // handleReset
  function reset() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }
  // automatically start a new game
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className='App'>
      <h1>magic match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          )
        })}
      </div>
      <p>Number of Turns: {turns}</p>
    </div>
  )
}

export default App
