import React, { useState } from 'react'
import '../../../styles/cards/card-list.css'

function CardList({ cards, RenderComponent, pageLimit, dataLimit }) {
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
          <RenderComponent key={idx} data={d} />
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
