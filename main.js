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
    ctx.fillText('Corona:' + score2, 200, 50);
    ctx.fillText('Heineken:' + score3, 400, 50);
    handleGifts()
    if (handleGifts()) return;
    animationId = requestAnimationFrame(animate)
    frame++;
}

function stopGame() {
    cancelAnimationFrame(animationId);
}
animate();