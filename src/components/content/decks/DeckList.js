import React, { useState } from 'react'

//Import the Deck component to display in the list
import Deck from './Deck.js'

function DeckList({ decks, pageLimit, dataLimit }) {
  console.log({
    'decks': decks,
    'pageLimit': pageLimit,
    'dataLimit': dataLimit
  })
  //Create state variable pages to hold the number of pages needed to display all cards
  const [pages] = useState(Math.round(decks.length / dataLimit))
  //Create state variables currentPage and setCurrentPage to hold the value of which page the user is on.
  const [currentPage, setCurrentPage] = useState(1)

  //Function goToNextPage to increase the page value by 1 when the next button is clicked
  function goToNextPage() {
    setCurrentPage((page) => page + 1)
  }

  //Function goToPreviousPage to decrease the page value by 1 when the previous button is clicked
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
  }

  //Function changePage to set the current page to the page number clicked
  function changePage(item) {
    const pageNumber = item
    setCurrentPage(pageNumber)
  }

  //Function getPaginatedData returns the individual paged cards.
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit
    return decks.slice(startIndex, endIndex)
  }

  //Function getPaginationGroup to display the page numbers
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1)
  }

  return (
    <div className='deck-list'>
      <div className='dataContainer'>
        {getPaginatedData().map((d, idx) => (
          <Deck key={idx} data={d} />
        ))}
      </div>

      {decks.length > dataLimit && (
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

export default DeckList
