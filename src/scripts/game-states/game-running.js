let gameOverIndex = null;

const gameRunning = {
    update: function () {        
        if (game.state === 1) {
            drawDots();
            connectDots();   
            highlightMousePath();   
        } 
        
        if (game.state === 2) {
            levelCompleted();
        }        

        if (game.state === -1) {
            drawDots();
            connectDots();
            markClosestDot();
        }
    },
        
    clickHandler: function (evt) {        
        if (game.state === 1) {
            const pixel = hitCtx.getImageData(mouse.x, mouse.y, 1, 1).data;
            if (pixel[1] + pixel[2] === 0) {
                const index = pixel[0];
    
                if (index === (game.levelProgress + 1)) {                
                    currentLevel[game.levelProgress].togglePulse();
                    game.levelProgress++;
                    currentLevel[game.levelProgress].togglePulse();
    
                    if (game.levelProgress === currentLevel.length - 1) {
                        game.score += (currentLevel.length -1);
                        game.state = 2;
                    }
                } else {
                    game.state = -1;                    
                    gameOverIndex = index;
                    currentLevel[index].color = settings.gameOverDotColor; 
                    localStorage.setItem('savegame', "");

                    if (game.highscore < game.score) {
                        game.highscore = game.score;
                        localStorage.setItem('highscore', game.score);
                    }        
                }            
            }
        } else if (game.state === 2) {                 
            generateLevel();            
        }
    }
};

function levelCompleted () {
    localStorage.setItem('savegame', JSON.stringify(game));

    ch.drawText(canvas.width / 2, canvas.height / 2, "Score: " + game.score, {
        size: "80px",            
        align: "center",
        letterSpacing: "50px"        
    });

    ch.drawText(canvas.width / 2, (canvas.height / 2) + 100, "[Click for next level]", {
        size: "40px",            
        align: "center",
        letterSpacing: "10px"        
    });
}

function drawDots () {
    for (let i = 0; i < currentLevel.length; i ++) {
        const dot = currentLevel[i];
        ch.drawCircle(dot.x, dot.y, dot.radius, {
            fill: dot.color,
            hitColor: dot.colorId
        });        
    }
}

function connectDots () {
    for (let i = 1; i <= game.levelProgress; i++) {
        ch.drawPath(currentLevel[i-1].x, 
                    currentLevel[i-1].y,
                    currentLevel[i].x, 
                    currentLevel[i].y,
                    true);
    }
}

function highlightMousePath () {
    ch.drawPath(currentLevel[game.levelProgress].x, 
        currentLevel[game.levelProgress].y,
        mouse.x, 
        mouse.y);
}

function markClosestDot () {    
    const center = {
        x: currentLevel[game.levelProgress].x,
        y: currentLevel[game.levelProgress].y
    };          
    const radius = currentLevel[game.levelProgress + 1].distance;
    
    ch.drawCircle (center.x, center.y, radius, {
        stroke: settings.gameOverDotColor
    });
}

export default gameRunning;