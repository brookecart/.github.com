(function () {
  'use strict';
  const pig = document.querySelector('h1').cloneNode(true);
  const content = document.querySelector('.content');
  const startButton = document.querySelector('#startButton');
  let gameData = {
    dice: ['1.jpg','2.jpg', '3.jpg',
          '4.jpg', '5.jpg', '6.jpg'],
    players: ['player 1', 'player 2'],
    colors: ['blue', 'red'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 29
  };

  // start game
  startButton.addEventListener('click', getPlayers);

  function getPlayers() {
    content.removeChild(document.querySelector('button'));

    //// player input interface
    // title
    const enterPlayer = document.createElement('h2');
    enterPlayer.innerHTML = 'enter player 1\'s name:';
    content.appendChild(enterPlayer);

    // input
    const newInput = document.createElement('input');
    content.appendChild(newInput);
    const inputArea = document.querySelector('input');
    inputArea.focus();

    // button
    const newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('id', 'playerButton');
    newButton.innerHTML = 'okay!';
    content.appendChild(newButton);
    const playerButton = document.querySelector('#playerButton');

    // get next player
    // by click
    playerButton.addEventListener('click', submitPlayer);
    // by enter key
    playerButton.addEventListener('keyup', function(event) {
      console.log("hey!");
      if (event.key === 'Enter') {
        // event.preventDefault();
        submitPlayer();
      }
    });
  }

  function submitPlayer() {
    const inputArea = document.querySelector('input');

    // handle data
    gameData.players[0] = inputArea.value;
    inputArea.value = "";
    inputArea.focus();

    // update button
    const preStart = document.querySelector('#playerButton').cloneNode(true);
    preStart.id = 'preStart';
    content.removeChild(document.querySelector('button'));
    content.appendChild(preStart);

    // update title
    document.querySelector('h2').innerHTML = 'enter player 2\'s name:';

    // set up board by click
    preStart.addEventListener('click', function() {
      gameData.players[1] = inputArea.value;
      setUpBoard();
    });
    // set up board by enter key
    preStart.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        gameData.players[1] = inputArea.value;
        setUpBoard();
      }
    });
  }

  function setUpBoard() {
    // remove existing elements
    // content.removeChild(document.querySelector('button'));  // button
    // content.removeChild(document.querySelector('h2'));  // label
    // content.removeChild(document.querySelector('input'));  // input
    // content.removeChild(document.querySelector('h1'));  // pig

    content.innerHTML = '';

    // player 1 / left side
    const leftPlayerSide = document.createElement('div');
    leftPlayerSide.className = 'playerSide';
    leftPlayerSide.id = 'leftPlayer';
    // score
    let scoreTag1 = document.createElement('h2');
    scoreTag1.className = 'score';
    scoreTag1.innerHTML = '0';  // initial score
    scoreTag1.classList.add(`${gameData.colors[0]}`);  // initial coloring because player 1 goes first
    leftPlayerSide.appendChild(scoreTag1);
    // name
    let nameTag1 = document.createElement('h3');
    nameTag1.className = 'name';
    nameTag1.innerHTML = `${gameData.players[0]}`;
    leftPlayerSide.appendChild(nameTag1);

    // player 2 / right side
    const rightPlayerSide = document.createElement('div');
    rightPlayerSide.className = 'playerSide';
    rightPlayerSide.id = 'rightPlayer';
    // score
    let scoreTag2 = document.createElement('h2');
    scoreTag2.className = 'score';
    scoreTag2.innerHTML = '0';  // initial score
    rightPlayerSide.appendChild(scoreTag2);
    // name
    let nameTag2 = document.createElement('h3');
    nameTag2.className = 'name';
    nameTag2.innerHTML = `${gameData.players[1]}`;
    rightPlayerSide.appendChild(nameTag2);

    // center interface
    const center = document.createElement('div');
    center.id = 'center';
    // start button
    const start = document.createElement('button');
    start.setAttribute('type', 'button');
    start.innerHTML = 'start';
    start.id = 'start';
    // first player indicator
    // const whoFirst = document.createElement('h2');
    // whoFirst.className = 'whoFirst';
    // whoFirst.classList.add(`${gameData.colors[0]}`);
    // whoFirst.innerHTML = `${gameData.players[0]} rolls first!`;
    // set up center
    center.appendChild(pig);
    center.appendChild(start);
    // center.appendChild(whoFirst);

    // set up whole board
    content.classList.add('activeGame');
    content.appendChild(leftPlayerSide);
    content.appendChild(center);
    content.appendChild(rightPlayerSide);

    start.addEventListener('click', startGame);
  }

  function startGame() {
    const center = document.querySelector('#center');

    // set up center interface
    center.innerHTML = '';

    // dice
    const dice = document.createElement('div');
    dice.className = 'dice';
    // left die
    const leftDie = document.createElement('img');
    leftDie.className = 'leftDie';
    leftDie.setAttribute('alt', 'Left die');
    dice.appendChild(leftDie);
    // right die
    const rightDie = document.createElement('img');
    rightDie.className = 'rightDie';
    rightDie.setAttribute('alt', 'Right die');
    dice.appendChild(rightDie);
    // initial state
    dice.classList.add('hide');

    // whose turn? title
    const whoseTurn = document.createElement('h1');
    whoseTurn.className = 'whoseTurn';
    whoseTurn.classList.add(`${gameData.colors[gameData.index]}`);
    whoseTurn.innerHTML = `${gameData.players[gameData.index]}'s turn!`;


    // roll and pass buttons
    const options = document.createElement('div');
    options.className = 'options';
    // roll
    let rollButton = document.createElement('button');
    rollButton.setAttribute('type', 'button');
    rollButton.innerHTML = 'roll';
    rollButton.id = 'rollButton';
    options.appendChild(rollButton);
    // pass
    let passButton = document.createElement('button');
    passButton.setAttribute('type', 'button');
    passButton.innerHTML = 'pass';
    passButton.id = 'pass';
    options.appendChild(passButton);

    center.appendChild(dice);
    center.appendChild(whoseTurn);
    center.appendChild(options);

    rollButton = document.querySelector('#rollButton');
    rollButton.addEventListener('click', function() {
      rollDice();
    });

    passButton = document.querySelector('#pass');
    passButton.addEventListener('click', function() {
      switchPlayers();
    });
  }

  function rollDice() {
    // variables
    const die1 = document.querySelector('.leftDie');
    const die2 = document.querySelector('.rightDie');
    const dice = document.querySelector('.dice');
    const whoseTurn = document.querySelector('.whoseTurn');

    // if starting a turn
    if (dice.classList.contains('hide')) {
      dice.classList.remove('hide');
    }

    // handle roll numbers
    gameData.roll1 = Math.floor(Math.random()*6)+1;
    gameData.roll2 = Math.floor(Math.random()*6)+1;
    gameData.rollSum = gameData.roll1 + gameData.roll2;
    console.log(gameData.roll1);
    console.log(gameData.roll2);

    // set images
    die1.setAttribute('src', `images/${gameData.roll1}.jpg`);
    die2.setAttribute('src', `images/${gameData.roll2}.jpg`);

    // handle rolls
    if (gameData.rollSum === 2) {
      // two 1's
      gameData.score[gameData.index] = 0;
      updateScore();
      whoseTurn.innerHTML = 'Snake eyes!';
      setTimeout(switchPlayers, 3000);
    } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
      // one of the rolls was a 1
      whoseTurn.innerHTML = 'You rolled 1! Switching players...';
      setTimeout(switchPlayers, 3000);
    } else {
      // valid roll
      gameData.score[gameData.index] += gameData.rollSum;
      updateScore();

      checkWinningCondition();
    }
  }

  function switchPlayers() {
    const dice = document.querySelector('.dice');
    const whoseTurn = document.querySelector('.whoseTurn');
    // remove dice
    dice.classList.add('hide');
    // update index
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    // update subtitle
    whoseTurn.innerHTML = `${gameData.players[gameData.index]}'s turn!`;
    // update color
    if (gameData.index == 0) {
      // now player 1's turn
      //// score
      // strip color from player 2
      document.querySelector('#rightPlayer .score').classList.remove(`${gameData.colors[1]}`);
      // add color to player 1
      document.querySelector('#leftPlayer .score').classList.add(`${gameData.colors[0]}`);
      //// subtitle
      whoseTurn.classList.remove(`${gameData.colors[1]}`);
      whoseTurn.classList.add(`${gameData.colors[0]}`);
    } else {
      // now player 2's turn
      //// score
      // strip color from player 1
      document.querySelector('#leftPlayer .score').classList.remove(`${gameData.colors[0]}`);
      // add color to player 2
      document.querySelector('#rightPlayer .score').classList.add(`${gameData.colors[1]}`);
      //// subtitle
      whoseTurn.classList.remove(`${gameData.colors[0]}`);
      whoseTurn.classList.add(`${gameData.colors[1]}`);
    }
  }

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      // winning interface
      const center = document.querySelector('#center');
      let subtitle = document.querySelector('.whoseTurn').cloneNode(true);
      let restartButton = document.querySelector('.options #rollButton').cloneNode(true);
      // remove game modules
      // center.removeChild(document.querySelector('.dice'));  // dice
      // center.removeChild(document.querySelector('.whoseTurn')); // subtitle
      // center.removeChild(document.querySelector('.options'));  // buttons

      center.innerHTML = '';

      // winner message
      subtitle.innerHTML = `${gameData.players[gameData.index]} wins!`;

      // restart button
      restartButton.id = 'restart';
      restartButton.innerHTML = 'restart';

      center.appendChild(pig);
      center.appendChild(subtitle);
      center.appendChild(restartButton);

      restartButton.addEventListener('click', reset);
    } else {
      // show score
      updateScore();
    }
  }

  // update the active player's score
  function updateScore() {
    if (gameData.index == 0) {  // player 1
      document.querySelector('#leftPlayer .score').innerHTML = `${gameData.score[0]}`;
    } else {  // player 2
      document.querySelector('#rightPlayer .score').innerHTML = `${gameData.score[1]}`;
    }
  }

  // put the game board back to its original state
  function reset() {
    let startButton = document.querySelector('#restart');
    startButton.innerHTML = 'play!';
    startButton.id = 'startButton';

    content.innerHTML = '';
    content.appendChild(pig);
    content.appendChild(startButton);
    content.classList.remove('activeGame');
  }

})();
