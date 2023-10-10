window.addEventListener('load', runGame);
window.addEventListener('resize', adjustCanvasSize);


function runGame() {
    console.log('Ready to run game')
}
const canvas = document.getElementById('snake-board');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function adjustCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let animationId;
const background = new Image();
background.src = './images/jungle.png';
let frame = 0;
let score1 = 0;
let score2 = 0;
let score3 = 0;
let windPoints = 20;
let gamespeed = 4;
let hue = 0;
const snakeSprite = new Image();
const snakeSprite1 = new Image();
const budweiser = new Image();
const corona = new Image();
const heineken = new Image();

snakeSprite.src = './images/snake.png';
budweiser.src = './images/bud.jpg';
corona.src = './images/coro.jpg';
heineken.src = './images/ken.png';
snakeSprite1.src = './images/snake-1.png';

const gameSound = document.createElement('audio');
gameSound.src = 'Summer-gift.mp3';
const earnGift1 = document.createElement('AUDIO');
earnGift1.src = 'Plop.ogg';
const earnGift2 = document.createElement('audio');
earnGift2.src = 'bubles-single2.wav';

class Snake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalWidth = 1024;
        this.originalHeight = 348;
        this.width = this.originalWidth / 8;
        this.height = this.originalHeight / 8;
        this.dx = Math.random() * gamespeed - (gamespeed / 2);
        this.dy = Math.random() * gamespeed - (gamespeed / 2);
        this.frameX = 0;
        this.frameY = 0;
        this.angle = 0;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.angle = Math.atan2(this.dy, this.dx);
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.dx = -this.dx
        }
        if (this.y <= 0 || this.y + this.height >= canvas.height) {
            this.dy = -this.dy
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        if (this.dx > 0) {
            ctx.drawImage(snakeSprite, this.frameX * this.originalWidth / 13 + 10,
                255, this.originalWidth / 13, this.originalHeight / 6 + 10,
                0, 0, this.width, this.height)
        } else {
            ctx.drawImage(snakeSprite1, this.frameX * this.originalWidth / 13 + 10,
                0, this.originalWidth / 13, this.originalHeight / 6 + 25,
                0, 0, this.width, this.height)
        }
        ctx.restore();
    }
    slither() {
        if (this.frameX >= 12) {
            this.frameX = 0;
        } else if (frame % 8 === 0) {
            this.frameX++;
        }
    }
}

const snake = new Snake();