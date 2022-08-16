import React, { useEffect, useState } from 'react'

//Import the CardForm component to create the form used for searching for cards
import CardForm from './CardForm'

//Import the CardList component to create the pagination component used to display the search results
import CardList from './CardList'

//Import the style sheet that is specific to this component 
//Style Sheets are organized as a mirror to the component organization
import '../../../styles/cards/cards.css'


//Cards component function to establish a parent component for the card search and display functionalities of the site. Intended to be used as both a separate page, as well as imported into the deck building section of the site.

//Cards does not receive any props, but it does pass many to its children components CardForm and CardList.

function Cards() {
  const [cards, setCards] = useState([])

  async function getCards(cardAxiosRes) {
    if (cardAxiosRes !== undefined) {
      let cardsResponse = []
      for (const cardGroup of cardAxiosRes) {
        cardsResponse = cardsResponse.concat(cardGroup.data)
      }
      
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
            pageLimit={5}
            dataLimit={8}
          />
        </>
      ) : (
        <h1 style={{color: 'white'}}>No Cards to Display</h1>
      )}
    </div>
  )
}

export default Cards
