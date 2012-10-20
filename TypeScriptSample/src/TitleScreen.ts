/// <reference path="Game.ts" />
/// <reference path="IBoard.ts" />

class TitleScreen implements IBoard{ 

    constructor (public title:string, public subtitle:string) { 
    
    }

    public step(dt: number) {

    }
    
    public draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "#FFFFFF";

        context.font = "bold 40px bangers";
        var measure = context.measureText(this.title);
        context.fillText(this.title, Game.width / 2 - measure.width / 2, Game.height / 2);

        context.font = "bold 20px bangers";
        var measure2 = context.measureText(this.subtitle);
        context.fillText(this.subtitle, Game.width / 2 - measure2.width / 2, Game.height / 2 + 40);
    }

}
/*
var TitleScreen = function TitleScreen(title, subtitle, callback) {

    this.step = function (dt) {
    };

    this.draw = function (ctx) {
 
    };
};
*/