import React, { useEffect, useState } from 'react'
import DeckForm from './DeckForm'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

function Decks() {
  const [decks, setDecks] = useState([])

  async function getDecks(deckAxiosRes) {
    console.log(deckAxiosRes)
    if (deckAxiosRes !== undefined) {
      let decksResponse = []
      for (const deckGroup of deckAxiosRes) {
        console.log(deckGroup.data)
        decksResponse = decksResponse.concat(deckGroup.data)
      }

      setDecks(decksResponse)
    }
    console.log('decks: ', decks)
  }

  //useEffect of getDecks so that the decks page can be updated with decks on any update
  //May tweak this so that the decks page starts with showing a set of decks already
  useEffect(() => {
    getDecks()
  })

  return (
    <div>
      <DeckForm getDecks={getDecks} />
      <DeckList decks={decks} pageLimit={5} dataLimit={8} />
      <button>New Deck</button>
    </div>
  )
}

export default Decks
