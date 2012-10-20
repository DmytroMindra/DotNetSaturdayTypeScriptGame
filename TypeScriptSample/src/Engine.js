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
