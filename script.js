let totalDraws = 120;
let targetNumber = null;
let drawnNumbers = [];
let drawCount = 0;
let gameStarted = false;
let numbers = [];
let revealedNumbers = new Set();

function startGame(draws) {
    totalDraws = draws;
    document.getElementById('selectedDraws').textContent = `${draws} 抽`;
    document.getElementById('gameSetup').style.display = 'none';
    document.getElementById('numberSetup').style.display = 'block';
}

function setTargetNumber() {
    const input = document.getElementById('targetNumberInput');
    targetNumber = parseInt(input.value, 10);

    if (isNaN(targetNumber) || targetNumber < 1 || targetNumber > totalDraws) {
        document.getElementById('setupPrompt').textContent = `請輸入有效的中獎號碼 (1-${totalDraws})`;
        return;
    }

    document.getElementById('setupPrompt').textContent = '';
    input.disabled = true;
    document.getElementById('numberSetup').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('targetNumberDisplay').textContent = targetNumber;

    // Generate random numbers for the game
    numbers = Array.from({ length: totalDraws }, (_, i) => i + 1);
    shuffle(numbers);

    startDrawing();
}

function startDrawing() {
    gameStarted = true;
    drawCount = 0;
    drawnNumbers = [];
    revealedNumbers.clear();
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    for (let i = 0; i < totalDraws; i++) {
        const div = document.createElement('div');
        div.textContent = '';
        div.classList.add('grid-item');
        div.addEventListener('click', () => handleClick(i, div));
        gameContainer.appendChild(div);
    }
}

function handleClick(index, div) {
    if (!gameStarted) return;

    const number = numbers[index];
    if (revealedNumbers.has(number)) {
        // Already revealed, do nothing
        return;
    }

    revealedNumbers.add(number);
    drawnNumbers.push(number);
    div.textContent = number;
    drawCount++;
    document.getElementById('drawCount').textContent = drawCount;

    if (number === targetNumber) {
        document.getElementById('result').textContent = '恭喜中獎！';
        gameStarted = false;
        showFireworks();
    }
}

function restartGame() {
    document.getElementById('gameSetup').style.display = 'block';
    document.getElementById('numberSetup').style.display = 'none';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('drawCount').textContent = '0';
    document.getElementById('targetNumberInput').disabled = false;
    document.getElementById('targetNumberInput').value = '';
    document.getElementById('targetNumberDisplay').textContent = '';
    document.getElementById('gameContainer').innerHTML = '';
    gameStarted = false;
}

function showFireworks() {
    const fireworksContainer = document.getElementById('fireworksContainer');
    fireworksContainer.innerHTML = '<div class="fireworks">🎆</div>';
    setTimeout(() => {
        fireworksContainer.innerHTML = '';
    }, 3000);
}

// Shuffle function to randomize the numbers array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 防右鍵和開發者工具的保護
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C'))) {
        event.preventDefault();
        alert('禁止開發者工具！');
    }
});
