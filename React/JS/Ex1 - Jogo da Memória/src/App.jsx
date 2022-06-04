import React, { useEffect, useState } from "react";
import "./App.css";

import imgs from "./../imgs/Imgs";
import Board from "./components/Board";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";

function App() {
  const findData = (url) => {
    let urlFormatado = url.split("/");
    urlFormatado = urlFormatado.at(-1).split(".");
    return urlFormatado[0];
  };

  const setaCartas = () => {
    let newCards = [];
    const imagens = imgs.frente;
    let aux = 0;
    for (let i = 0; i < imagens.length * 2; i++) {
      aux = aux == imagens.length ? 0 : aux;
      newCards.push({
        id: `div${i}`,
        url: imagens[aux],
        flip: true,
        matched: false,
        data_card: findData(imagens[aux]),
        style: { order: Math.floor(Math.random() * (imagens.length * 2)) },
      });
      aux++;
    }
    return newCards;
  };
  const [cards, setCards] = useState(setaCartas());
  const [firstCard, setFirstCard] = useState({ setado: false });
  const [secondCard, setSecondCard] = useState({ setado: false });
  const [hasFlipped, setHasFlipped] = useState(false);
  const [primeiraExecucao, setExecucao] = useState(true);

  const resetaState = () => {
    setHasFlipped(false);
    setFirstCard({ setado: false });
    setSecondCard({ setado: false });
  };
  const unFlip = (cartas) => {
    let newCards = cartas.map((carta) => {
      return { ...carta, flip: false };
    });
    setTimeout(() => {
      setCards(newCards);
      setExecucao(false);
    }, 2000);
  };

  function startGame() {
    resetaState();
    setCards('');
    setCards(setaCartas());
    setExecucao(true);
  }

  useEffect(() => {
    // Verifica se tem match
    // if(primeiraExecucao)
    if (hasFlipped == "Match?") {
      if (firstCard.data_card == secondCard.data_card) {
        const newCards = cards.map((card) => {
          if (card.id == firstCard.id) {
            return { ...card, matched: true };
          } else if (card.id == secondCard.id) {
            return { ...card, matched: true };
          }
          return card;
        });
        setTimeout(() => {
          setCards(newCards);
          resetaState();
        }, 1500);
      } else {
        const newCards = cards.map((card) => {
          if (card.id == firstCard.id) {
            return { ...card, flip: false };
          } else if (card.id == secondCard.id) {
            return { ...card, flip: false };
          }

          return card;
        });

        setTimeout(() => {
          setCards(newCards);
          resetaState();
        }, 1500);
      }
    }

    let cartasFlipped = 0;
    cards.forEach((element) => {
      element.flip ? cartasFlipped++ : "";
    });
    if (cartasFlipped == cards.length && primeiraExecucao) {
      unFlip(cards);
    } else if (cartasFlipped == cards.length) {
      //
    }
  });

  const handleClick = (id) => {
    console.log(primeiraExecucao);
    if (secondCard.setado == true || primeiraExecucao) return;
    const newCards = cards.map((card) => {
      // Quando clica muda o hasFlipped se n tiver no match
      if (card.flip) return card;
      if (!hasFlipped && card.id == id && !card.matched) {
        setHasFlipped(true);
        if (!firstCard.setado) {
          setFirstCard({ ...card, setado: true });
          return { ...card, flip: true };
        }
      } else if (hasFlipped && card.id == id && !card.matched) {
        if (!secondCard.setado && card.id != firstCard.id) {
          setHasFlipped("Match?");
          setSecondCard({ ...card, setado: true });
          return { ...card, flip: true };
        }
      }

      return card;
    });
    setCards(newCards);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Inicio startGame={startGame} />} />
        <Route
          path="/game" exact
          element={<Board cards={cards} handleClick={handleClick} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
