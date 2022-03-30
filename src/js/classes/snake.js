import Config from "/src/js/config.js";

export default class Snake {

	constructor(){
		this.config = new Config();
		this.x = this.config.groundWidth / 2;
		this.y =  this.config.groundHeight /2;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;
		this.eat_sound = new Audio();
		this.eat_sound.src = "sounds/eat_sound.mp3";
		this.death_sound = new Audio();
		this.death_sound.src = "sounds/game_over.mp3";
		this.snake_sprite = new Image();
		this.snake_sprite.src = "images/content/snake_sprite.png"
		this.control();
	}

	update(apple, score, canvas ) {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x + this.config.sizeCell >= this.config.groundWidth || this.y + this.config.sizeCell >= this.config.groundHeight
			|| this.x <= 0 || this.y<= 0){
			this.death();
			score.setToZero();
			apple.randomPosition();
		}

		if (this.x < this.config.sizeCell) {
			this.x = this.config.groundWidth - 2 * this.config.sizeCell;
		} else if ( this.x >= this.config.groundWidth - this.config.sizeCell) {
			this.x = this.config.sizeCell;
		}

		if (this.y < this.config.sizeCell) {
			this.y = this.config.groundHeight - 2 * this.config.sizeCell;
		} else if ( this.y >= this.config.groundHeight - this.config.sizeCell) {
			this.y = this.config.sizeCell;
		}

		this.tails.unshift( { x: this.x,
                          y: this.y } );

		if ( this.tails.length > this.maxTails ) {
			this.tails.pop();
		}

		this.tails.forEach( (el, index) => {

			if ( el.x === apple.x && el.y === apple.y ) {
				this.maxTails++;
				score.incScore();
				apple.randomPosition();
				this.eat_sound.play();
			}

			for( let i = index + 1; i < this.tails.length; i++ ) {

				if ( el.x == this.tails[i].x && el.y == this.tails[i].y) {
					this.death();
					score.setToZero();
					apple.randomPosition();
				}
			}
		} );
	}

	draw(context) {

		for (var i=0; i<this.tails.length; i++) {
            var tail = this.tails[i];
            var segx = tail.x;
            var segy = tail.y;
            var tilex =tail.x;
            var tiley = tail.y;

            var tx = 0;
            var ty = 0;

            if (i == 0) {
                var nseg = this.tails[i+1];
								if (typeof nseg === 'undefined'){
									return;
								}
                if (segy < nseg.y) {
                    tx = 3; ty = 0;
                } else if (segx > nseg.x) {
                    tx = 4; ty = 0;
                } else if (segy > nseg.y) {
                    tx = 4; ty = 1;
                } else if (segx < nseg.x) {
                    tx = 3; ty = 1;
                }
            } else if (i == this.tails.length-1) {
                var pseg = this.tails[i-1];
                if (pseg.y < segy) {
                    tx = 3; ty = 2;
                } else if (pseg.x > segx) {
                    tx = 4; ty = 2;
                } else if (pseg.y > segy) {
                    tx = 4; ty = 3;
                } else if (pseg.x < segx) {
                    tx = 3; ty = 3;
                }
            } else {
                var pseg = this.tails[i-1];
                var nseg = this.tails[i+1];
                if (pseg.x < segx && nseg.x > segx || nseg.x < segx && pseg.x > segx) {
                    tx = 1; ty = 0;
                } else if (pseg.x < segx && nseg.y > segy || nseg.x < segx && pseg.y > segy) {
                    tx = 2; ty = 0;
                } else if (pseg.y < segy && nseg.y > segy || nseg.y < segy && pseg.y > segy) {
                    tx = 2; ty = 1;
                } else if (pseg.y < segy && nseg.x < segx || nseg.y < segy && pseg.x < segx) {
                    tx = 2; ty = 2;
                } else if (pseg.x > segx && nseg.y < segy || nseg.x > segx && pseg.y < segy) {
                    tx = 0; ty = 1;
                } else if (pseg.y > segy && nseg.x > segx || nseg.y > segy && pseg.x > segx) {
                    tx = 0; ty = 0;
                }
            }

            context.drawImage(this.snake_sprite, tx*64, ty*64, 64, 64, tilex, tiley,
                              64, 64);
	}
}

	death() {
		this.x = this.config.groundWidth / 2;
		this.y =  this.config.groundHeight /2;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;
		this.death_sound.play();
	}

	control() {
		document.addEventListener("keydown",  (e) => {
			if ( e.code == "KeyW" && this.dy <= 0) {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyA" && this.dx <= 0) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			} else if ( e.code == "KeyS" && this.dy >= 0) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyD" && this.dx >= 0) {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		}
	);
	}
}
