import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

// NÃO DESENVOLVIDO AINDA

const Inicio = ({ startGame }) => {
  const [saida, setSaida] = useState(false);
  const [linkDeSaida, setLink] = useState("");
  return (
    <div className={`container ${saida ? "saindo" : ""}`}>
      <Link
        to={"/game"}
        className="link-inicio"
        onClick={() => {
          setSaida(true);
          startGame();
        }}
      >
        INICIO
      </Link>
    </div>
  );
};

export default Inicio;
