// Sleep
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Mazo de Cartas
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
  puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");

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

  deck = _.shuffle(deck);
  return deck;
};

crearDeck();
if (puntosJugador === 0) {
  btnDetener.disabled = true;
}

// JUGADOR - Tomar una carta
const pedirCarta = () => {
  btnDetener.disabled = false;
  if (deck.length === 0) {
    throw "No hay cartas en el Deck";
  }
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la Computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/cartas/${carta}.png`;
    imgCarta.classList.add("fade-in");
    imgCarta.classList.add("carta");
    imgCarta.classList.add("hide");

    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  ///////////////////////
  // const listaCartas = document.querySelector('#computadora-cartas').querySelector('img');
  // console.log(listaCartas.length);

  function borrarCartas() {
    const listaCartas = document
      .querySelector("#computadora-cartas")
      .querySelector("img.hide")
    console.log(listaCartas);
    if (listaCartas) {
        listaCartas.classList.remove("hide")
    } else {
      clearInterval(timer);
    }
  }

  const timer = setInterval(borrarCartas, 300);
  // borrarCartas();
  //////////////////////

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      btnDetener.disabled = true;
      alert("Nadie Gana :( ");
    } else if (puntosMinimos > 21) {
      btnDetener.disabled = true;
      alert("Computadora Gana");
    } else if (puntosComputadora > 21) {
      btnDetener.disabled = true;
      alert("Jugador Gana");
    } else {
      btnDetener.disabled = true;
      alert("Computadora Gana");
    }
  }, 2000);
};

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `/assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  imgCarta.classList.add("fade-in");

  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21 Genial!!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = true;
});
