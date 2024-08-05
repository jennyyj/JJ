/* SideBar JS */
document.addEventListener('DOMContentLoaded', function () {
    var dropdownToggle = document.getElementById('dropdownToggle');
    var dropdownMenu = document.getElementById('dropdownMenu');
  
    console.log(dropdownToggle); // Check if this is not null
    console.log(dropdownMenu); // Check if this is not null
  
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            dropdownMenu.classList.toggle('show');
        });
  
        document.addEventListener('click', function (event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
  });

  /*Tic Tac Toe */
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
    let isGameActive = true;
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });
    
    function handleClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell'));
    
        if (cell.textContent !== '' || !isGameActive) return;
    
        placeMark(cell, currentPlayer);
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && isGameActive) {
                setTimeout(() => {
                    makeAiMove();
                }, 500);
            }
        }
    }
    
    function evaluate(board) {
      // Check for winning combinations
      for (let i = 0; i < winningCombinations.length; i++) {
          const [a, b, c] = winningCombinations[i];
          if (board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
              // If the AI wins, return a positive score
              if (board[a].textContent === 'O') {
                  return 10;
              }
              // If the user wins, return a negative score
              else if (board[a].textContent === 'X') {
                  return -10;
              }
          }
      }
  
      // Check for a draw
      if (isDraw()) {
          return 0;
      }
  
      // If the game is still ongoing, return null
      return null;
  }
  
    function placeMark(cell, player) {
        cell.textContent = player;
    }
    
    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }
    
    function isDraw() {
        return [...cells].every(cell => {
            return cell.textContent !== '';
        });
    }
    
    function endGame(draw) {
        if (draw) {
            alert('It\'s a draw!');
        } else {
            alert(`${currentPlayer} wins!`);
        }
        isGameActive = false;
    }
    
    function makeAiMove() {
      let bestScore = -Infinity;
      let bestMove;
      for (let i = 0; i < cells.length; i++) {
          if (cells[i].textContent === '') {
              cells[i].textContent = currentPlayer;
              const score = minimax(cells, 0, -Infinity, Infinity, false);
              cells[i].textContent = '';
              if (score > bestScore) {
                  bestScore = score;
                  bestMove = i;
              }
          }
      }
      cells[bestMove].textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
          endGame(false);
      } else if (isDraw()) {
          endGame(true);
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  }
  
  function minimax(board, depth, alpha, beta, isMaximizingPlayer) {
      const result = evaluate(board);
      if (result !== null) {
          return result;
      }
  
      if (isMaximizingPlayer) {
          let bestScore = -Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i].textContent === '') {
                  board[i].textContent = 'O';
                  const score = minimax(board, depth + 1, alpha, beta, false);
                  board[i].textContent = '';
                  bestScore = Math.max(score, bestScore);
                  alpha = Math.max(alpha, score);
                  if (beta <= alpha) {
                      break;
                  }
              }
          }
          return bestScore;
      } else {
          let bestScore = Infinity;
          for (let i = 0; i < board.length; i++) {
              if (board[i].textContent === '') {
                  board[i].textContent = 'X';
                  const score = minimax(board, depth + 1, alpha, beta, true);
                  board[i].textContent = '';
                  bestScore = Math.min(score, bestScore);
                  beta = Math.min(beta, score);
                  if (beta <= alpha) {
                      break;
                  }
              }
          }
          return bestScore;
      }
  }

  /* Chat Bot */
function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + sender;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    if (message.trim() === '') return;

    addMessage(message, 'user');
    userInput.value = '';

    // Simple bot response logic
    const botResponse = getBotResponse(message);
    setTimeout(() => addMessage(botResponse, 'bot'), 500);
}

function getBotResponse(message) {
    // Simple responses, you can expand this
    const responses = {
        'hello': 'Hi there! Want to hear a joke? (reply yes or no)',
        'hi': 'Hi there! Want to hear a joke? (reply yes or no)',
        'no': 'Wow no fun for you then! Bye!',
        'yes': 'Why did the AI join the gym? (you ask why)',
        'ok yes': 'Great! Why did the AI join the gym?',
        'why': 'To improve its HARD-WARE! HA HA did you think that was funny? (reply y or n)',
        'y': 'You might not have a great sense of humour...hire Jenny and she can improve your humour AND company!',
        'n': 'Well, Jenny is way better at jokes and doing basically everything, you should go and talk to her then.',
        'whats up': 'Not much I am a bot.',
        'how are you': 'I am a bot, I am always great because I just have to respond to you.',
        'what is your name': 'I was not given one because I am just a demonstration.',
        'bye': 'Goodbye!'
    };

    message = message.toLowerCase();
    return responses[message] || 'I am a simple bot, hire Jenny if you want to get a better response or know all that :)';
}

/* Snake Game */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of the snake and food
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food;

function createFood() {
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 3) * box
    };
}

createFood();

let score = 0;
let direction;
let nextDirection;
let game;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') nextDirection = 'LEFT';
    else if (event.keyCode == 38 && direction != 'DOWN') nextDirection = 'UP';
    else if (event.keyCode == 39 && direction != 'LEFT') nextDirection = 'RIGHT';
    else if (event.keyCode == 40 && direction != 'UP') nextDirection = 'DOWN';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? '#00515b' : '#eec7be';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#f0f2cf';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#e2b055';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (nextDirection) {
        direction = nextDirection;
        nextDirection = null;
    }

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        showRestartPrompt();
    } else {
        snake.unshift(newHead);
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Montserrat';
    ctx.fillText('Score: ' + score, box, box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function showRestartPrompt() {
    setTimeout(() => {
        if (confirm('Game Over. Your score is ' + score + '. Do you want to restart?')) {
            restartGame();
        }
    }, 100);
}

function restartGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    score = 0;
    direction = null;
    nextDirection = null;
    createFood(); // Ensure food is created before the game restarts
    clearInterval(game); // Clear the existing game interval
    game = setInterval(draw, 100); // Restart the game
}

game = setInterval(draw, 100);
