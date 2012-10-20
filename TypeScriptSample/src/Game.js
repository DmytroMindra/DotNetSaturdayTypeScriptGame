var startGame = function () {
    Game.setBoard(0, new Starfield(document, 320, 480, 20, 0.4, 100, true));
    Game.setBoard(1, new Starfield(document, 320, 480, 50, 0.6, 100, false));
    Game.setBoard(2, new Starfield(document, 320, 480, 100, 1, 50, false));
    Game.setBoard(3, new TitleScreen(".NET Saturday", "Coming soon"));
};
