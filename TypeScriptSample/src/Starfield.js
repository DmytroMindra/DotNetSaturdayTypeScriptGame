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
