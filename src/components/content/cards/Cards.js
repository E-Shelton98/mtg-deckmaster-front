import React, { useEffect, useState } from 'react'
import CardForm from './CardForm'
import CardList from './CardList'
import Card from './Card.js'
import '../../../styles/cards/cards.css'

function Cards() {
  const [cards, setCards] = useState([])

  async function getCards(cardAxiosRes) {
    if (cardAxiosRes !== undefined) {
      let cardsResponse = []
      for (const cardGroup of cardAxiosRes) {
        cardsResponse = cardsResponse.concat(cardGroup.data)
      }
      console.log(cardAxiosRes)
      console.log(cardsResponse)
      
      setCards(cardsResponse)
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <div id='card-page'>
      <CardForm getCards={getCards} />
      {cards.length > 0 ? (
        <>
          <CardList
            cards={cards}
            RenderComponent={Card}
            pageLimit={5}
            dataLimit={6}
          />
        </>
      ) : (
        <h1 style={{color: 'white'}}>No Cards to Display</h1>
      )}
    </div>
  )
}

export default Cards
