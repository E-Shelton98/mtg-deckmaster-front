import React from 'react'

//Import the style sheet that is specific to this component. Style sheets are organized as a mirror to the component organization
import '../../../styles/cards/card.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//Card component function to establish the display of an individual card and its relevant information
//The Card component receives data from its parent component CardList in the form of a single prop "data", which includes all of the data for that particular card
//From the "data" prop you can access any relevant information needed to display the card or it's alternative data

//////////////////////////////////////////////////////////////////////////////////////////////
//FILE COMPONENT FUNCTION

function Card({ data }) {
  //Using the prop "data" return a card image using the small image, as well as an alt that uses the card's name (ie. "card Inspiring Veteran")
  return (
    <img
      className='card'
      src={data.image_uris.small}
      alt={`card ${data.name}`}
    />
  )
}

export default Card
