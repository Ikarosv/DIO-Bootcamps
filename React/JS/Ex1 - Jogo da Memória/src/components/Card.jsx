import React from "react";
import imgs from "../../imgs/Imgs";
import "./Cards.css";

function Card({ id, url, flip, style, data_card, handleClick }) {
  return (
    <>
      <div className={`card${flip?" flip": ""}`} style={style} onClick={ () => handleClick(id, data_card) } >
        <img src={url} className="card-front" />
        <img src={imgs.back} className="card-back" />
      </div>
    </>
  );
}

export default Card;
