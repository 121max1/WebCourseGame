import Config from "/src/js/config.js";
import { getRandomInt } from "/src/js/tools/functions.js";

export default class Apple {
    constructor( canvas ) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;

        this.config = new Config();
        this.randomPosition();
        this.apple = new Image();
        this.apple.src = "images/content/burger.png"
    }

    draw(context) {
        context.drawImage(this.apple, this.x, this.y)
    }

    randomPosition() {
        this.x = getRandomInt( 1, (this.canvas.element.width - this.config.sizeCell) / this.config.sizeCell ) * this.config.sizeCell;
        this.y = getRandomInt( 1, (this.canvas.element.height -this.config.sizeCell) / this.config.sizeCell ) * this.config.sizeCell;
    }
}
