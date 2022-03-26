import React, { useEffect, useState } from 'react'
import CardForm from './CardForm'
import CardList from './CardList'

function Cards() {
  const [cards, setCards] = useState([])

  async function getCards(cardFetchRes) {
    if (cardFetchRes !== undefined) {
      setCards(cardFetchRes.data)
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <div>
      <CardForm getCards={getCards} />
      <CardList cards={cards} />
    </div>
  )
}

export default Cards
