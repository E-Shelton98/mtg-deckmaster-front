import React from 'react'
import '../../../styles/cards/card.css'

function Card({ data }) {
  return <img className="card" src={data.image_uris.small} alt={`card ${data.name}`} />
}

export default Card
