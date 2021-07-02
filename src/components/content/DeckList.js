import React from 'react'

function DeckList({ decks }) {
  function renderDecks() {
    return decks.map((deck, i) => {
      return <li key={i}>{deck.name}</li>
    })
  }

  return (
    <div>
      <ul>{renderDecks()}</ul>
    </div>
  )
}

export default DeckList
