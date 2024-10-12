const palabraSecreta = "WORDLE"; 
const filas = 5; 
const columnas = 5; 
let intentoActual = [];
let filaActual = 0;

// Crear tablero vacío
const tableroDiv = document.getElementById('tablero');
function crearTablero() {
  for (let i = 0; i < filas * columnas; i++) {
    const casilla = document.createElement('div');
    casilla.classList.add('casilla');
    tableroDiv.appendChild(casilla);
  }
}

// Crear teclado
const letras = 'QWERTYUIOPASDFGHJKLÑZXCVBNM';
const tecladoDiv = document.getElementById('teclado');
function crearTeclado() {
  for (let letra of letras) {
    const tecla = document.createElement('div');
    tecla.classList.add('tecla');
    tecla.textContent = letra;
    tecla.onclick = () => seleccionarLetra(letra);
    tecladoDiv.appendChild(tecla);
  }
}

function seleccionarLetra(letra) {
  if (intentoActual.length < columnas) {
    intentoActual.push(letra);
    actualizarTablero();
  }
}


function actualizarTablero() {
  const cajitas = document.querySelectorAll('.casilla');
  for (let i = 0; i < columnas; i++) {
    const index = filaActual * columnas + i;
    cajitas[index].textContent = intentoActual[i] || '';
  }
}


function adivinar() {
  if (intentoActual.length !== columnas) {
    alert("Completa las 5 letras antes de adivinar.");
    return;
  }

  const cajitas = document.querySelectorAll('.casilla');
  for (let i = 0; i < columnas; i++) {
    const index = filaActual * columnas + i;
    const letra = intentoActual[i];
    if (letra === palabraSecreta[i]) {
      cajitas[index].classList.add('correcto');
    } else if (palabraSecreta.includes(letra)) {
      cajitas[index].classList.add('parcial');
    } else {
      cajitas[index].classList.add('incorrecto');
    }
  }

  if (intentoActual.join('') === palabraSecreta) {
    alert("¡Felicidades, has adivinado la palabra!");
  } else if (filaActual < filas - 1) {
    filaActual++;
    intentoActual = [];
  } else {
    alert(" La palabra correcta es: " + palabraSecreta);
  }
}


crearTablero();
crearTeclado();
