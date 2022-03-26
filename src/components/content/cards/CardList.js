import React from 'react'

function CardList({ cards }) {
  function renderCards() {
    return cards.map((card, i) => {
      return <li key={i}>{card.name}</li>
    })
  }

  return (
    <div>
      <ul>{renderCards()}</ul>
    </div>
  )
}

export default CardList
