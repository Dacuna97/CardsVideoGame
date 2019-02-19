/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

var toSkip = 0;
var skip = toSkip;

var oldtimestamp = 0;
/**
 * Constructora de MemoryGame
 */
MemoryGame = function (gs) {
    this.state = "Memory Game";
    this.win = 0;
    this.clicks = 0;
    this.cards = [{
            name: "8-ball",
            times: 2
        }, {
            name: "potato",
            times: 2
        }, {
            name: "dinosaur",
            times: 2
        },
        {
            name: "kronos",
            times: 2
        }, {
            name: "rocket",
            times: 2
        }, {
            name: "unicorn",
            times: 2
        }, {
            name: "guy",
            times: 2
        }, {
            name: "zeppelin",
            times: 2
        }
    ];
    this.maze = [];
    // Inicialización del juego
    this.initGame = function () {
        //random set of cards to initialize
        while (this.maze.length < 16) {
            let number = Math.floor(Math.random() * this.cards.length);
            if (this.cards[number].times > 0) {
                this.maze.push(new MemoryGameCard(this.cards[number].name));
                this.cards[number].times--;
            }
        }
        //requestAnimationFrame(game.loop);
        this.loop();
    };
    this.loop = function ( /*timestamp*/ ) {
        /* if (skip > 0) {
             --skip;
         } else {
             var dt = (timestamp - oldtimestamp) / 1000;
             oldtimestamp = timestamp;
             /*gs.ctx.fillStyle = "#000";
             gs.ctx.fillRect(0, 0, gs.width, gs.length);*/
        setInterval(() => {
            this.draw();
        }, 16);
        //analytics.step(dt);
        //analytics.draw(gs.ctx);
        //}
        //requestAnimationFrame(game.loop);
    };
    this.draw = function () {
        gs.drawMessage(this.state + " Clicks = " + this.clicks);
        for (let i = 0; i < this.maze.length; i++) {
            this.maze[i].draw(gs, i);
        }
    };

    this.cards_turned = [];

    this.onClick = function (cardId) {
        if (this.cards_turned.length < 2) {
            if (this.maze[cardId].back) {
                this.clicks++;
                this.maze[cardId].flip();
                this.cards_turned.push(game.maze[cardId]);
            }
        }
        if (this.cards_turned.length === 2) {
            if (this.cards_turned[0].compareTo(this.cards_turned[1])) {
                this.win++;
                if (this.win < 8) {
                    this.state = "Match Found!!";
                } else {
                    this.state = "You Win!!"
                }
                this.cards_turned[0].found();
                this.cards_turned[1].found();


            } else {
                this.state = "Try Again!!";
                let card1 = this.cards_turned[0];
                let card2 = this.cards_turned[1];
                setTimeout(() => {
                    card1.flip();
                    card2.flip();
                }, 250);
            }
            this.cards_turned = [];
        }

        //requestAnimationFrame(game.loop);
    };
}




/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function (id) {
    this.id = id;
    this.back = true;
    this.is_found = false;

    this.flip = function () {
        this.back = !this.back;
    };

    this.found = function () {
        this.is_found = true;
    };

    this.compareTo = function (otherCard) {
        return this.id === otherCard.id;
    };

    this.draw = function (gs, pos) {
        if (this.back) {
            gs.draw("back", pos);
        } else {
            gs.draw(this.id, pos);
        }
    };
};

/*var analytics = new function () {
    var lastDate = Date.now();
    this.getDT = function () {
        var now = Date.now();
        var dt = (now - lastDate) / 1000;
        lastDate = now;
        return dt;
    }
    var time = 0; //tiempo acumulado total
    var frames = 0; //numero de frames que llevo acumulados durante un periodo de tiempo
    var fps = 0; //frames por segundo
    this.step = function (dt) { //esto va en segundos
        time += dt; //cuanto tiempo ha pasado en este frame
        ++frames;
        if (time > 1.0) { //cuando ha pasado 1 segundo
            //calculo los fps
            fps = frames / time;
            frames = 0;
            time = 0;
        }
    };
    this.draw = function (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "left";

        ctx.font = "bold 16px arial";
        ctx.fillText(Math.round(fps), 0, 20);
    };
}*/