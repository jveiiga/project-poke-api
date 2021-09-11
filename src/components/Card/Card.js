import React from 'react'
import './Card.css'

const Card = ({ pokemon }) => {
    return (
       <div className="Card">
           <div className="Card__name">
               {pokemon.name}
           </div>
       </div>
    )
}

export default Card;