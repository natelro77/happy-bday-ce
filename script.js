const playButton = document.getElementById('playButton');
const mainCard = document.getElementById('mainCard');
const gameContainer = document.getElementById('gameContainer');
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const gameOver = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const playAgainButton = document.getElementById('playAgainButton');
const backButton = document.getElementById('backButton');
const confettiContainer = document.getElementById('confettiContainer');

let score = 0;
let timeLeft = 30;
let gameInterval;
let balloonInterval;
let timerInterval;

const balloonColors = ['🎈', '🎀', '🎁', '💖', '🌸', '⭐', '💕', '✨'];

function createConfetti() {
    const colors = ['#ff6b9d', '#56ccf2', '#ffc8dd', '#c06c84', '#2f80ed'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

createConfetti();
setInterval(createConfetti, 6000);

playButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);
backButton.addEventListener('click', () => {
    gameContainer.classList.remove('active');
    mainCard.style.display = 'block';
    gameOver.classList.remove('active');
    createConfetti();
});

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    
    mainCard.style.display = 'none';
    gameContainer.classList.add('active');
    gameOver.classList.remove('active');
    gameArea.style.display = 'block';
    gameArea.innerHTML = '';
    
    clearInterval(timerInterval);
    clearInterval(balloonInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    balloonInterval = setInterval(createBalloon, 800);
    createBalloon();
}

function createBalloon() {
    if (timeLeft <= 0) return;
    
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    const maxX = gameArea.offsetWidth - 60;
    const maxY = gameArea.offsetHeight - 60;
    
    balloon.style.left = Math.random() * maxX + 'px';
    balloon.style.top = Math.random() * maxY + 'px';
    
    balloon.addEventListener('click', () => popBalloon(balloon));
    
    gameArea.appendChild(balloon);
    
    setTimeout(() => {
        if (balloon.parentElement) {
            balloon.remove();
        }
    }, 3000);
}

function popBalloon(balloon) {
    if (balloon.classList.contains('pop-animation')) return;
    
    score++;
    scoreElement.textContent = score;
    
    balloon.classList.add('pop-animation');
    
    setTimeout(() => balloon.remove(), 300);
    
    createBalloon();
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(balloonInterval);
    
    gameArea.style.display = 'none';
    finalScoreElement.textContent = score;
    gameOver.classList.add('active');
    
    createConfetti();
}
