import React, { useEffect, useState } from 'react'

//Import the DeckForm component to create the form used for searching for decks
import DeckForm from './DeckForm'

//Import the DeckList component to create the pagination component used to display the search results
import DeckList from './DeckList'

//Import the NewDeck component to function as a separate page for creating a new deck <<--- NOT WORKING YET --->>
import NewDeck from './NewDeck'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//Decks component function to establish a parent component for the deck search, display, and creation functionalities of the site. Intended to be used as a separate page within the site.

//Decks does not receive any props, but it does pass many to its children components DeckForm and DeckList.

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//DECKFORM
//DeckForm receives the prop "getDecks" which is the function of same name which receives and concats the search data from the DeckForm

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
//DECKLIST
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
