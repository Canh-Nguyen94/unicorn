const winBanner = document.getElementById('win-banner');
const giftArray = [];

class Gift {
    constructor(name) {
        this.name = name;
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * canvas.width - this.width;
        this.y = 0;
        this.dx = gamespeed;
        this.dy = gamespeed;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
    }
    update() {
        this.y += this.dy;
    }
    draw() {
        switch (this.name) {
            case 'budweiser': ctx.drawImage(budweiser, this.x, this.y, this.width, this.height);
                break;
            case 'corona': ctx.drawImage(corona, this.x, this.y, this.width, this.height);
                break;
            default: ctx.drawImage(heineken, this.x, this.y, this.width, this.height);
        }

    }
}

function gameEnd(name) {
    winBanner.innerText = "Game End, winner is " + name;
    winBanner.style.display = 'block';
    // ctx.font = "25px Georgia";
    // ctx.fillStyle = "white";
    // ctx.fillText("Game End, winner is " + name, cavas.width / 2 - 20, canvas.height / 2 - 10);
    restartBtn.style.display = 'block';
}

function handleGifts() {
    if (score1 >= windPoints) {
        gameEnd('budweiser')
        return true;
    }
    if (score2 >= windPoints) {
        gameEnd('corona')
        return true;
    }
    if (score3 >= windPoints) {
        gameEnd('heineken')
        return true;
    }
    if (frame % 200 == 0) {
        giftArray.push(new Gift('budweiser'))
        giftArray.push(new Gift('corona'))
        giftArray.push(new Gift('heineken'))
    }
    for (let i = 0; i < giftArray.length; i++) {
        giftArray[i].update();
        giftArray[i].draw();
        if (giftArray[i].y >= canvas.height) {
            giftArray.splice(i, 1);
            i--;
        }

        if (giftArray[i] && !(giftArray[i].x + giftArray[i].width < snake.x ||
            giftArray[i].x > snake.x + snake.width ||
            giftArray[i].y + giftArray[i].height < snake.y ||
            giftArray[i].y > snake.y + snake.height)
        ) {
            if (!giftArray[i].counted) {
                giftArray[i].sound === 'sound1' ? earnGift1.play() : earnGift2.play();
                switch (giftArray[i].name) {
                    case 'budweiser': score1++;
                        break;
                    case 'corona': score2++;
                        break;
                    default: score3++;
                }
                giftArray[i].counted = true;
                giftArray.splice(i, 1);
                i--;
            }
        }
    }

}