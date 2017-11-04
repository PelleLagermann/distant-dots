const gameOver = {
    update: function () {        
        ch.drawText(canvas.width / 2, (canvas.height / 2) - 100, "GAME OVER", {
            size: "80px",            
            align: "center",
            letterSpacing: "50px"        
        });
    
        ch.drawText(canvas.width / 2, canvas.height / 2, "Score: " + game.score, {
            size: "60px",            
            align: "center",
            letterSpacing: "30px"        
        });
        
        ch.drawText(canvas.width / 2, (canvas.height / 2) + 30, "Personal best: " + game.highscore, {
            size: "20px",            
            align: "center",
            letterSpacing: "5px"        
        });        
    
        ch.drawText(canvas.width / 2, (canvas.height / 2) + 100, "[Click for next level]", {
            size: "40px",            
            align: "center",
            letterSpacing: "10px"        
        });        
    },
    clickHandler: function () {
        initGame();
        generateLevel();        
    }
};

export default gameOver;