import React from "react";
import "./Board.css";
import Card from "./Card";

function Board({ cards, handleClick }) {
 

  return (
    <main className="memory-game" >
      {cards.map((element) => (
        <Card
          // Dificil manutenção, mudar mais tarde
          id={element.id}
          key={element.id}
          url={element.url}
          flip={element.flip}
          style={element.style}
          handleClick={handleClick}
          data_card={element.data_card}
        />
      ))}
    </main>
  );
}

export default Board;
