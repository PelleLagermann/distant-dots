// import "./levels.js";
// import "./game.js";

/***************************
 * 
 * BRUG DENNE FONT https://fonts.google.com/specimen/Press+Start+2P 
 * 
 */

// import {fps, canvas, ctx} from "./globals";
import canvasHelpers from "./canvas-helpers";
import generateLevel from "./generateLevel";
import homeScreen from "./game-states/home-screen";
import gameRunning from "./game-states/game-running";
import gameOver from "./game-states/game-over";

import debugInfo from "./debug-info";

global.canvas = document.getElementById("gameCanvas");
global.ctx = canvas.getContext("2d");
global.hitCanvas = document.getElementById("hitCanvas");
global.hitCtx = hitCanvas.getContext("2d");

global.ch = canvasHelpers;
global.generateLevel = generateLevel;

global.settings = {
    debug: false,    
    fps: 50,
    baseDots: 5,
    dotIncrease: 3,
    padding: 20,
    dotRadius: 10,
    dotColor: "#A4EED6"
};

global.mouse = {
    x: 0,
    y: 0
};

global.initGame = function () {    
    const highscore = localStorage.getItem('highscore') || 0;

    global.game = {    
        state: 0, // O: Home screen, 1: Game running, 2: Level completed, -1: Game over
        score: 0,
        level: 0,
        levelProgress: 0,
        highscore: highscore
    };
}
initGame();

function refreshCanvas () {
    let grd = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height);
    grd.addColorStop(0,"#00202F");
    grd.addColorStop(1,"#00314C");
    
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Reset hitCanvas
    hitCtx.fillStyle = "white";
    hitCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop () {
    refreshCanvas();
    
    if (game.state === 0) { //HOME SCREEN
        homeScreen.update();
    } else if (game.state === 1 || game.state === 2) { //GAME RUNNING
        gameRunning.update();
    } else if (game.state === -1) { //GAME OVER
        gameOver.update();
    }    

    if (game.debug) {
        debugInfo.mousePosition();
        debugInfo.hoverDotIndex();
        debugInfo.hoverRadius();
    }    
}

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        hitCanvas.width = window.innerWidth;
        hitCanvas.height = window.innerHeight;
}
resizeCanvas();    

window.addEventListener('resize', resizeCanvas, false);
    
canvas.addEventListener("click", function (evt) {    
    if (game.state === 0) { //HOME SCREEN
        homeScreen.clickHandler(evt);
    } else if (game.state === 1 || game.state === 2) { //GAME RUNNING
        gameRunning.clickHandler(evt);
    } else if (game.state === -1) { //GAME OVER
        gameOver.clickHandler();
    }
});

canvas.addEventListener("mousemove", function (evt) {
    const canvasRect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    
    mouse.x = evt.clientX - canvasRect.left - root.scrollLeft;
    mouse.y = evt.clientY - canvasRect.top - root.scrollTop;       
});
    
setInterval(gameLoop, (1000 / settings.fps));
  
