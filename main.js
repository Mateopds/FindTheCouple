'use strict'

//? AQUÍ EMPIEZAN LAS CONSTANTES


//* CONSTANTES PARA EL HTML
const cards = document.querySelectorAll(".card");
let firstCard = null;
let numDeclicks = 0;

//* CONSTANTES DEL JUEGO
const tablero = document.querySelector('.tablero');
const celdas = document.querySelectorAll('.carta');
const tries = document.querySelector('.tries');
const player = document.querySelector('.player');
const ranking = document.querySelector('.rank');

//* CONSTANTES DE CONGRATS
const result = document.querySelector('.result');
let contador = 0;
let contadorFlipped = 0;

// *CONSTANTES DE SHUFFLING CARDS

const cartasArray = Array.from(celdas);
let j = 0;

//* CONSTANTES PARA INICIAR EL JUEGO CON EL FORMULARIO

const btn = document.querySelector('.btnStart');
const form = document.forms[0]
const pObligatorio = document.querySelector('.obligatorio');


//? AQUÍ EMPIEZAN LAS FUNCIONES


//* FUNCIÓN SHUFFLINGCARDS, PARA BARAJAR LAS CARTAS

function shufflingCards (array) {
  for (let i = 0; i < array.length; i++){
    let j = Math.floor(Math.random()* (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  array.forEach(carta => {
    tablero.append(carta);
  });
};


//* FUNCIÓN SHOWCARDS, PARA MOSTRAR LAS CARTAS Y LUEGO OCULTARLAS

function showCards() {
  cards.forEach(card => {
    card.classList.add("flipped");
  });
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove("flipped")
    });
  }, 6000);
};


// * FUNCIÓN WELLDONE, PARA FELICITAR LOS ACIERTOS DURANTE EL JUEGO

function wellDone() {
  const congrats = document.createElement('p');
  congrats.classList.add("felicitar");
  congrats.textContent = "WELL DONE!";
  tablero.append(congrats);
  setTimeout(() => {
    congrats.remove();
  }, 1000);
};
  
  
// * FUNCIÓN YOUWON, PARA FELICITAR LA FINALIZACIÓN DEL JUEGO Y SU LÓGICA POSTERIOR

function youWon() {
  const hasGanadoModal = document.createElement('div');    
  hasGanadoModal.classList.add("fondo");
  hasGanadoModal.innerHTML = `
  <div class="finalJuego">YOU WON!</div>
  `;
  tablero.append(hasGanadoModal);
  btnReset.textContent = 'TRY AGAIN';

  console.log(player.firstElementChild.textContent);   

  let rankPlayer = player.firstElementChild.textContent;

  let rankResult = result.textContent;

  saveRanking(rankPlayer, rankResult);
  
  getRanking();
};

// * FUNCIÓN CONGRATS, PARA EJECUTAR LA FUNCIÓN ADECUADA CONGRANTSENDGAME O CONGRATSMIDDLEGAME
  
const congrats = () => {
  if (contadorFlipped === 8){
    youWon();
  } else {
    wellDone();
  };
};


//* FUNCIÓN SAVERANKING, PARA GUARDAR DATOS EN LOCALSTORAGE

function saveRanking(rankPlayer, rankResult) {

  const savedScores = JSON.parse(localStorage.getItem('scores')) || [];

  savedScores.push({rankPlayer, rankResult});

  savedScores.sort((a, b) => {b.rankResult - a.rankResult});

  localStorage.setItem('scores', JSON.stringify(savedScores));
  
};


//* FUNCIÓN GETRANKING, PARA CARGAR DATOS DE LOCALSTORAGE

function getRanking() {
  
  const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
  
  while (savedScores.length < 3) {
    savedScores.push({ rankPlayer: '', rankResult: '' });
  };

  savedScores.sort((a, b) => a.rankResult - b.rankResult);
  const player1 = document.querySelector('.top-players');
  
  player1.innerHTML =`
  <article class = "punctuation">
  <p>${savedScores[0].rankPlayer}</p> 
  <p>${savedScores[0].rankResult}</p>
  </article>
  <article class = "punctuation">
  <p>${savedScores[1].rankPlayer}</p> 
  <p>${savedScores[1].rankResult}</p>
  </article>
  <article class = "punctuation">
  <p>${savedScores[2].rankPlayer}</p> 
  <p>${savedScores[2].rankResult}</p>
  </article>
  `;

  return savedScores;

};


//* FUNCIÓN RESET, PARA REPETIR EL JUEGO SIN TENER QUE VOLVER A INTRODUCIR UN NOMBRE DE USUARIO

function reset() {
  contador = 0;
  result.textContent = 0;
  firstCard = null;
  startGame();
  for (const card of cards) {
    card.classList.remove('flipped');
    card.addEventListener("click", reveal); 
  };
  if (contadorFlipped === 8) {
    const hasGanadoModalDuplicado = document.querySelector('.fondo');
    hasGanadoModalDuplicado.remove();
  };
  contadorFlipped = 0;

  getRanking();
};


// * FUNCIÓN REVEAL, PARA REALIZAR EL FLIPCARD Y LA LÓGICA DEL JUEGO

const reveal = (e) => {
  if (numDeclicks < 2) {
  const currentCard = e.currentTarget;
    if (currentCard.classList.contains("flipped")) {
    return;
    };
  currentCard.classList.add("flipped");
  if (firstCard === null) {
    firstCard = currentCard;
    return;
  } else if (firstCard !== null) {
    const firstCardValue = firstCard.firstElementChild.lastElementChild.textContent;
    const secondCardValue = currentCard.firstElementChild.lastElementChild.textContent;

    if (firstCardValue === secondCardValue) {
      currentCard.removeEventListener('click', reveal);
      firstCard.removeEventListener('click', reveal);
      contador ++;
      result.textContent = contador;
      firstCard = null;
      contadorFlipped ++;
      console.log(contadorFlipped);
      congrats();
      return contadorFlipped;
    
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        currentCard.classList.remove("flipped");
        firstCard = null;
      }, 1000);
      contador ++;
      result.textContent = contador;
    };
  };
    numDeclicks++
    if (numDeclicks = 2){
      setTimeout(() => {
        numDeclicks = 0
      }, 1050);
    };
  };
};


//* FUNCIÓN VALIDATENAME, PARA VALIDAR NOMBRE DE USUARIO

function validateName(input) {
  if (input.value === '') {
    pObligatorio.textContent = 'Required *'
    pObligatorio.classList.add('invalid');
    return null; 
  } else if (input.value.length < 3) {
    pObligatorio.textContent =  `Too short *`
    pObligatorio.classList.add('invalid');
    return null; 
  } else if (input.value.length > 7){
    pObligatorio.textContent = 'Too long *'
    pObligatorio.classList.add('invalid');
    return null; 
  } else {
    pObligatorio.textContent = '';
    return input.value;
  };
};


//* FUNCIÓN CREATEUSERNAME, PARA CREAR EL ELEMENTO EN EL JUEGO PARA EL NOMBRE DE USUARIO

function createUserName(userName) {
  const newUser = document.createElement('p');
  newUser.textContent = userName.toUpperCase();
  newUser.style.margin = '15px';
  return newUser;
};


//* FUNCIÓN STARTGAME, PARA INICIAR EL JUEGO

function startGame() {
  shufflingCards(cartasArray);
  const start = setTimeout(() => {
    showCards(cards);
    // * Constantes Cuenta Atrás
    let cronometro = 5;
    let intervalo = document.querySelector(".cuentaatras")
    let seccioninicio = document.querySelector(".iniciocontador")
    
     //  * Función Cuenta Atrás
    let iniciojuego = setInterval(() => {
      intervalo.textContent = cronometro;
      seccioninicio.classList.remove("invisible")
      cronometro--;
      if(cronometro === -1){
        clearInterval(iniciojuego);
        seccioninicio.classList.add("invisible");
        btnReset.classList.remove('invisible');
        player.classList.remove('invisible');
        tries.classList.remove('invisible');
        result.classList.remove('invisible');
        ranking.classList.remove('invisible');
      };
    }, 1000); 
  }, 500);
};


//? AQUÍ EMPIEZA LA EJECUCIÓN DE NUESTRO CÓDIGO Y LOS EVENTOS DISPONIBLES


//* EVENTO EN EL FORMULARIO DEL MODAL PRINCIPAL, PARA CUANDO REALICEMOS EL SUBMIT EMPEZAR TODA LA LÓGICA DE NUESTRO JUEGO

form.addEventListener('submit', (event) => {
  
  event.preventDefault();
  const userName = validateName(form.name);
  
  if (userName === null) {
    return;
  };
  
  const newUser = createUserName(userName);
  player.appendChild(newUser);
  form.classList.add('invisible');
  
  reset();

  getRanking();
});


//* EVENTO DE CLICK PARA EL BOTÓN RESET
  
const btnReset = document.querySelector(".reset");
btnReset.addEventListener('click', () => {
  reset();
  btnReset.classList.add('invisible');
  player.classList.add('invisible');
  tries.classList.add('invisible');
  result.classList.add('invisible');
  ranking.classList.add('invisible');
});


//* EVENTO DE CLICK PARA EL BOTÓN STAGE

const btnStage = document.querySelector('.stage');
btnStage.addEventListener('click', () => {

  const changeColor = document.querySelector('.change-color');

  if (changeColor.getAttribute("href") === "styles/styles-theme.css") {
    changeColor.setAttribute("href", "styles/styles.css");
  } else {
    changeColor.setAttribute("href", "styles/styles-theme.css");
  };
});