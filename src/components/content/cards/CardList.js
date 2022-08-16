import React, { useState } from 'react'

//Import the Card component to display in the list
import Card from './Card.js'

//Import the style sheet that is specific to this component 
//Style Sheets are organized as a mirror to the component organization
import '../../../styles/cards/card-list.css'

//////////////////////////////////////////////////////////////////////////////////////////////
//PRIMARY FILE COMMENTS

//CardList component function to establish the creation and display of the card data that has been searched
//The CardList component receives three props named "cards", "pageLimit", and "dataLimit" from the parent Cards component
//The prop "cards" is the card data that needs displayed based on the search
//The prop "pageLimit" is an integer value that is used to set the number of pages shown in the page index bar at one time (ie. "5" will show pages 1 - 5, then 6 - 10 and so forth)
//The prop "dataLimit" is an integer value that is used to set the number of cards shown on a single page at one time (ie. "8" will show 8 separate cards on page 1, 8 separate cards on page 2, and so forth till there are no more cards left.)

//Passes the prop "data" to the Card component which is used to render the individual cards in the list via an array map.

//////////////////////////////////////////////////////////////////////////////////////////////
//FILE COMPONENT FUNCTION

function CardList({ cards, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(cards.length / dataLimit))
  const [currentPage, setCurrentPage] = useState(1)

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
  }

  function changePage(item) {
    const pageNumber = item
    setCurrentPage(pageNumber)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return cards.slice(startIndex, endIndex)
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div className='card-list'>
      <div className='dataContainer'>
        {getPaginatedData().map((d, idx) => (
          <Card key={idx} data={d} />
        ))}
      </div>

      {cards.length > dataLimit && (
        <div className='pagination'>
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
            Prev
          </button>

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={() => changePage(item)}
              className={`paginationItem ${
                currentPage === item ? 'active' : null
              }`}>
              <span>{item}</span>
            </button>
          ))}

          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}>
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default CardList
