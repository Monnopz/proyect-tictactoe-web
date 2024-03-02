import { ref } from 'vue';

const winnerCombinationsArray = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

const iconsEquivalencyTable = {
    'X': 'icon pi pi-times',
    'O': 'icon pi pi-circle'
};

// Variables Js
const player1Array = [];
const player2PCArray = []; // Array de Jugador 2 o PC
let player1Score = ref(0); //Score de Jugador
let player2PCScore = ref(0); //Score de Jugador
let tieScore = ref(0); // Score de empate
let isPCTurn = false; // Variable que controla cuando es turno de la computadora para bloquear las acciones del otro jugador
let thereIsAWinner = false; // Variable que determina si ya hay un ganador en el juego
let thereIsATie = false; // Variable que determina si el juego quedó en empate

// Referencias HTML
let tableTicTacToe;


// Funcion que retorna un booleano en caso de que el jugador actual utilice un numero(posicion en el tablero) que ya ha sido utilizado por el mismo u otro jugador
const isSamePlayerNumber = ( player1Array = [], player2PCArray = [], value = 0 ) => { // (Si el numero(posicion) del jugador que se está pasando es igual a algun numero(posicion) que ya haya puesto el mismo) o (Si el numero(posicion) del jugador que se está pasando es igual a algun numero(posicion) que ya haya puesto PC) entonces retorna true
    return (player1Array.filter( num => num === value ).length > 0) || (player2PCArray.filter( num => num === value ).length > 0)
}

// TODO: Hacer el juego para 1vs1 sin jugador computadora
//TODO: Crear niveles: Facil, intermedio, Dificil
//TODO: Dar la posibilidad de que se puedan nombrar los jugadores (Solo PC No)
//TODO: Agregar sockets para jugadores en otros lugares del mundo
//TODO: Agregar la posibilidad de juego Clasico: XO y Personalizado: Donde el jugador elija sus iconos
//TODO: Agregar animaciones. Por ejemplo, la linea al ganar el juego, cuando se gana el juego hacer parpadear el numero, marcar el turno en el que va

// Funcion que analiza el winnerCombinationsArray en base al array del jugador actual para determinar un ganador o empate
const determineWinnerAlgorithm = ( combinationsArr = [], playerLabel = '' ) => {

    if( combinationsArr.length < 3 ) return;

    for( let i = 0; i < winnerCombinationsArray.length; i++ ){
        const filteredPositions = combinationsArr.filter( currentPlayerPosition => winnerCombinationsArray[i].find( currentCombination => currentPlayerPosition === currentCombination ) ).sort();
        if( JSON.stringify(filteredPositions) === JSON.stringify(winnerCombinationsArray[i]) ){ // Si la condición es verdadera, hay ganador
            if( playerLabel === 'Player-1' ) {
                player1Score.value = player1Score.value + 1;
            }
            else {
                player2PCScore.value = player2PCScore.value + 1;
            }
            thereIsAWinner = true;
            return; // Termina la ejecucion de toda la funcion
        }
    }

    if( (player1Array.length + player2PCArray.length) >= 9 ) {
        thereIsATie = true;
        tieScore.value = tieScore.value + 1;
        return; 
    }

}

const paintInHTML = ( symbolXO, numberPosition ) => {
    const currentCellButtonHTML = tableTicTacToe.value.querySelectorAll('.btn-value')[--numberPosition]; // tableTicTacToe es una variable reactiva, por eso le sigue un .value; numberPosition se le hace un pre-decremento para que coincida con los indices-0 del arreglo
    currentCellButtonHTML.firstChild.setAttribute('class', iconsEquivalencyTable[symbolXO] ); // Agrega el icono de acuerdo al jugador en turno basado en una tabla de equivalencias
}

// Funcion que delega los turnos
const determineTurns = ( symbolXO, playerLaber = 'PC', value = 0 ) => {
    if( thereIsAWinner || thereIsATie ) return; // Si ya hay ganador o empate, ya no continua con el turno
    let currentPlayerValue;
    switch (playerLaber) {
        case 'Player-1':
            if( isPCTurn ) return; // Si es el turno de la PC entonces no aplica el turno del jugador
            currentPlayerValue = value;
            if(isSamePlayerNumber(player1Array, player2PCArray, currentPlayerValue )) return; // Ejecuta la funcion de evaluacion
            player1Array.push(currentPlayerValue);
            paintInHTML( symbolXO, currentPlayerValue ); // Llama la función que pinta el simbolo en la vista
            determineWinnerAlgorithm(player1Array, playerLaber);
            determineTurns('O', 'PC-Player');
        break;
        case 'PC-Player':
            isPCTurn = true;
            do {
                currentPlayerValue = Math.floor(Math.random() * 9) + 1; // Genera un numero entre el 1 y el 9 para la PC
            } while (isSamePlayerNumber(player1Array, player2PCArray, currentPlayerValue )); // Ejecuta la funcion de evaluacion
            player2PCArray.push(currentPlayerValue);
            setTimeout(() => {
                paintInHTML( symbolXO, currentPlayerValue ); // Llama la función que pinta el simbolo en la vista
                determineWinnerAlgorithm(player2PCArray, playerLaber);
                isPCTurn = false;
            }, 700);
        break;
    }
}

const resetGame = () => {
    player1Array.length = 0;
    player2PCArray.length = 0;
    isPCTurn = false;
    thereIsAWinner = false;
    thereIsATie = false;
    tableTicTacToe.value.querySelectorAll('.btn-value').forEach( element =>  {
        element.firstChild.setAttribute('class', '' );
    })
}

const useTicTacToe = ( elementHTML ) => {

    if( !tableTicTacToe ) { // Si aun no se le ha asignado valor a la variable global, entonces se inicializa
        tableTicTacToe = elementHTML;
    }

    // Funcion visible para la vista que permite pedir un turno a la funcion determineTurns para agregar un nuevo numero(posicion) a su arreglo correspondiente
    // Esta funcion tambien espera un HTMLElement
    const pushValue = ( value ) => {
        determineTurns('X', 'Player-1', value);
    }

    return {
        player1Score,
        player2PCScore,
        tieScore,

        pushValue,
        resetGame

    }

}

export default useTicTacToe;