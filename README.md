# proyecto-hab-grupo-a

## Descripción del proyecto

  Juego de descubrir parejas. Las puntuaciones se basan en el número de intentos. La mejor puntuación equivale al menor número de intentos. 

## Funcionalidades

### Funciones

  1. Función validateName 👉 valida el nombre de usuario
  2. Función createUserName 👉 crea el elemento en el HTML con el nombre de usuario
  3. Función startGame 👉 inicia el juego
  4. Función shufflingCards 👉 baraja las cartas
  5. Función showCards 👉 muestra y oculta las cartas
  6. Función wellDone 👉 felicita los aciertos durante el juego
  7. Función youWon 👉 felicita la finalización del juego 
  8. Función congrats 👉 ejecuta la felicitación correspondiente
  9. Función saveRanking 👉 guarda el nombre de usuario y su puntuación en el localStorage
  10. Función getRanking 👉 carga los datos de los tres primeros jugadores del ranking
  11. Función reset 👉 reinicia el juego
  12. Función reveal 👉 realiza el giro de cartas y ejecuta la lógica del juego
  
### Eventos 

  1. Evento submit del formulario 👉 recoge y valida el nombre de usuario, lanza el juego y carga el ranking
  2. Evento click sobre las cartas 👉 inicia la función reveal y la lógica del juego
  3. Evento click para el botón reset 👉 reinicia la partida 
  4. Evento click para el botón theme 👉 cambia la temática del juego
  
## Cómo pueden usarlo los usuarios

  Los usuarios deben introducir su nombre de usuario y presionar start game. 

  Una vez en la pantalla, se mostrarán 16 cartas boca arriba durante 5 segundos en los que el jugador deberá memorizar las 8 parejas.

  Cada vez que se acierta una pareja, ambas cartas permanecen levantadas hasta el final del juego. La finalidad es destapar todas las cartas con el menor número de intentos.

  Si el jugador desea reiniciar la partida, dispone de un botón de reset.

  El jugador puede cambiar la paleta de colores.

## Autores del proyecto

  Adrián Acuña Cabrera
  Cristina Requejo Sáez
  Martín Castro Cores
  Mateo Palleiro Dos Santos
  Yogesh Samtani Mirchan


