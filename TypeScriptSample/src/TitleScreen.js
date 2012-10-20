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
