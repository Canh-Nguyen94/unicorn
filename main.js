const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    if (BG.x1 <= -BG.width + gamespeed / 4) BG.x1 = BG.width;
    else BG.x1 -= gamespeed / 4;
    if (BG.x2 <= -BG.width + gamespeed / 4) BG.x2 = BG.width;
    else BG.x2 -= gamespeed / 4;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    snake.update();
    snake.slither();
    snake.draw();
    ctx.fillStyle = 'black';
    ctx.font = "25px Georgia";
    ctx.fillText('Budweiser:' + score1, 10, 50);
    ctx.fillText('Corona:' + score2, 10, 100);
    ctx.fillText('Heineken:' + score3, 10, 150);
    ctx.fillText('Win points:' + windPoints, canvas.width - 170, 50);
    handleGifts()
    // handlePArticles()
    if (handleGifts()) return;
    animationId = requestAnimationFrame(animate)
    frame++;
}

function startGame() {
    startBtn.style.display = 'none';
    gameSound.play();
    animate();
}
function restartGame() {
    frame = 0;
    score1 = 0;
    score2 = 0;
    score3 = 0;
    windPoints += 5;
    gamespeed = 4;
    restartBtn.style.display = 'none';
    winBanner.style.display = 'none';
    animate();
}