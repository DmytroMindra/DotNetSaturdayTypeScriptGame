((function () {
    var lastTime = 0;
    var vendors = [
        'ms', 
        'moz', 
        'webkit', 
        'o'
    ];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if(!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if(!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})());
var Game = new function () {
    var boards = [];
    this.initialize = function (canvasElementId, callback) {
        this.canvas = document.getElementById(canvasElementId);
        this.canvasMultiplier = 1;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        callback();
        this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
        if(!this.ctx) {
            return alert("Please upgrade your browser to play");
        }
        this.loop();
    };
    var lastTime = new Date().getTime();
    var maxTime = 1 / 30;
    this.loop = function (curTime) {
        requestAnimationFrame(Game.loop);
        var dt = (curTime - lastTime) / 1000;
        if(dt > maxTime) {
            dt = maxTime;
        }
        for(var i = 0, len = boards.length; i < len; i++) {
            if(boards[i]) {
                boards[i].step(dt);
                boards[i].draw(Game.ctx);
            }
        }
        lastTime = curTime;
    };
    this.setBoard = function (num, board) {
        boards[num] = board;
    };
}();
var Starfield = (function () {
    function Starfield(document, width, height, speed, opacity, numStars, clear) {
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.opacity = opacity;
        this.numStars = numStars;
        this.clear = clear;
        this.offset = 0;
        this.renderStarField(document);
    }
    Starfield.prototype.renderStarField = function (document) {
        this.canvas = (document.createElement('canvas'));
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        if(this.clear) {
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.width, this.height);
        }
        this.context.fillStyle = "#FFF";
        this.context.globalAlpha = this.opacity;
        for(var i = 0; i < this.numStars; i++) {
            this.context.fillRect(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height), 2, 2);
        }
    };
    Starfield.prototype.step = function (dt) {
        this.offset += dt * this.speed;
        this.offset = this.offset % this.height;
        if(isNaN(this.offset)) {
            this.offset = 0;
        }
    };
    Starfield.prototype.draw = function (context) {
        var intOffset = Math.floor(this.offset);
        var remaining = this.height - intOffset;
        if(intOffset > 0) {
            context.drawImage(this.canvas, 0, remaining, this.width, intOffset, 0, 0, this.width, intOffset);
        }
        if(remaining > 0) {
            context.drawImage(this.canvas, 0, 0, this.width, remaining, 0, intOffset, this.width, remaining);
        }
    };
    return Starfield;
})();
var TitleScreen = (function () {
    function TitleScreen(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
    }
    TitleScreen.prototype.step = function (dt) {
    };
    TitleScreen.prototype.draw = function (context) {
        context.fillStyle = "#FFFFFF";
        context.font = "bold 40px bangers";
        var measure = context.measureText(this.title);
        context.fillText(this.title, Game.width / 2 - measure.width / 2, Game.height / 2);
        context.font = "bold 20px bangers";
        var measure2 = context.measureText(this.subtitle);
        context.fillText(this.subtitle, Game.width / 2 - measure2.width / 2, Game.height / 2 + 40);
    };
    return TitleScreen;
})();
var startGame = function () {
    Game.setBoard(0, new Starfield(document, 320, 480, 20, 0.4, 100, true));
    Game.setBoard(1, new Starfield(document, 320, 480, 50, 0.6, 100, false));
    Game.setBoard(2, new Starfield(document, 320, 480, 100, 1, 50, false));
    Game.setBoard(3, new TitleScreen(".NET Saturday", "Coming soon"));
};
window.addEventListener("load", function () {
    Game.initialize("game", startGame);
});
//@ sourceMappingURL=output.js.map
