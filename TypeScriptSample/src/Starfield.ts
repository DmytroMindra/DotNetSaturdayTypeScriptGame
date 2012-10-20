/*

From :
  Professional HTML5 Mobile Game Development [Kindle Edition]
  Pascal Rettig (Author) 

*/

/// <reference path="IBoard.ts" />

class Starfield implements IBoard {

    private canvas: HTMLCanvasElement;
    private offset: number;
    private context: CanvasRenderingContext2D;


    constructor (document: Document,
                 private width: number,
                 private height: number,
                 private speed: number,
                 private opacity: number,
                 private numStars: number,
                 private clear: bool) {

        this.offset = 0;        
        this.renderStarField(document);
    }


    private renderStarField(document: Document) {
        this.canvas = <HTMLCanvasElement>(document.createElement('canvas'));
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");

        if (this.clear) {
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.width, this.height);
        }

        this.context.fillStyle = "#FFF";
        this.context.globalAlpha = this.opacity;
        for (var i = 0; i < this.numStars; i++) {
            this.context.fillRect(Math.floor(Math.random() * this.width),
                             Math.floor(Math.random() * this.height),
                             2,
                             2);
        }


    }


    // IBoard contract implementations 

    public step(dt: number) {
        this.offset += dt * this.speed;
        this.offset = this.offset % this.height;
        if (isNaN(this.offset)) this.offset = 0;
    }; 

    public draw(context: CanvasRenderingContext2D) {

        var intOffset = Math.floor(this.offset);
        var remaining = this.height - intOffset;

        // Draw the top half of the starfield
        if (intOffset > 0) {

            context.drawImage(this.canvas,
                      0, remaining,
                      this.width, intOffset,
                      0, 0,
                      this.width, intOffset);
        }

        // Draw the bottom half of the starfield
        if (remaining > 0) {

            context.drawImage(this.canvas,
                      0, 0,
                      this.width, remaining,
                      0, intOffset,
                      this.width, remaining);
        }
    };
}