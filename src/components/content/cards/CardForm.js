import React, { useState } from 'react'
import axios from 'axios'

function CardForm({ getCards }) {
  //LEGALITY === FORMAT IN DB (ie. format = standard means LEGAL in standard)
  const [cardLegality, setCardLegality] = useState('standard')
  const [cardRestricted, setCardRestricted] = useState('false')

  //TO SELECT A CARD THAT IS ALL COLORS AT ONCE DO BGRUW
  const [cardColor, setCardColor] = useState([])
  const [cardCMC, setCardCMC] = useState('')

  //SEARCH MUST BE STRICT UPPER CASING OF FIRST LETTER (ie. Zephyr Boots)
  const [cardName, setCardName] = useState()

  async function searchCards(e) {
    e.preventDefault()

    try {
      let cardFetchString = `http://localhost:5000/cards?format=${cardLegality}&colors=${cardColor}&cmc=${cardCMC}&name=${cardName}`
      if (cardCMC !== '') {
        cardFetchString = cardFetchString + `&cmc=${cardCMC}`
      }
      if (cardRestricted === 'true') {
        cardFetchString = cardFetchString + `&restricted=true`
      }
      let cards = await axios.get(cardFetchString)
      getCards(cards)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={searchCards}>
        <input
          type='text'
          placeholder='Legal In'
          onChange={(e) => {
            setCardLegality(e.target.value)
          }}
          value={cardLegality}
        />

        <input
          type='radio'
          id='restricted'
          name='restricted_modifier'
          onChange={(e) => {
            setCardRestricted(e.target.value)
          }}
          value='true'
        />
        <input
          type='radio'
          id='not_restricted'
          name='restricted_modifier'
          onChange={(e) => {
            setCardRestricted(e.target.value)
          }}
          value='false'
        />

        <input
          type='text'
          placeholder='Card Color'
          onChange={(e) => {
            setCardColor(e.target.value)
          }}
          value={cardColor}
        />
        <input
          type='text'
          placeholder='Card CMC'
          onChange={(e) => {
            setCardCMC(e.target.value)
          }}
          value={cardCMC}
        />
        <input
          type='text'
          placeholder='Card Name'
          onChange={(e) => {
            setCardName(e.target.value)
          }}
          value={cardName}
        />
        <button type='submit'>Search Cards</button>
      </form>
    </div>
  )
}

export default CardForm
