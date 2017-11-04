const homeScreen = {
    update: function () {        
        ch.drawText(canvas.width / 2, canvas.height / 2, "Distant Dots", {
            size: "80px",            
            align: "center",
            letterSpacing: "50px"        
        });

        ch.drawText(canvas.width / 2, (canvas.height / 2) + 100, "[Click to start a new game]", {
            size: "40px",            
            align: "center",
            letterSpacing: "10px"        
        });
    },        

    clickHandler: function () {        
        generateLevel();        
    }
};


export default homeScreen;