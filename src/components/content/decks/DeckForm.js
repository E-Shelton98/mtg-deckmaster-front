import React, { useState } from 'react'
import axios from 'axios'

function DeckForm({getDecks}) {
  const [deckName, setDeckName] = useState('')

  async function saveDeck(e) {
    e.preventDefault()

    try {
        const deckData = {
          deckType: 'Standard',
          cards: ['A card'],
          notes: ['A note'],
          name: deckName
        }
        await axios.post('https://deckmaster.herokuapp.com/decks/', deckData)
        getDecks()
    } catch(err) {
        console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={saveDeck}>
        <input
          type='text'
          placeholder='Deck Name'
          onChange={(e) => {
            setDeckName(e.target.value)
          }}
          value={deckName}
        />
        <button type='submit'>Save new deck</button>
      </form>
    </div>
  )
}

export default DeckForm
