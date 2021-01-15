let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  //   console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// Tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el Deck";
  }
  const carta = deck.pop();
  console.log(deck);
  console.log(carta);
  return carta;
};

// pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  //   let puntos = 0;
  //   //   console.log({ valor });
  //   if (isNaN(valor)) {
  //         puntos = ( valor ==='A') ? 11 : 10
  //   } else {
  //     puntos = valor * 1;
  //   }

  //   console.log(puntos);
};

const valor = valorCarta(pedirCarta());
console.log({valor});
