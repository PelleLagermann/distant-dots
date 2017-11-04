
const debugInfo = {    
    mousePosition: function () {
        const mousePosition = "x: " + mouse.x + " - y: " + mouse.y;
        ch.drawText(20, 40, mousePosition, "hotpink");        
    },
    hoverDotIndex: function () {
        const pixel = hitCtx.getImageData(mouse.x, mouse.y, 1, 1).data;
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

        ch.drawText(20, 80, "Color: " + color, "hotpink");
    },
    hoverRadius: function () {
        if (game.state === 1) {
            const center = {
                x: currentLevel[game.levelProgress].x,
                y: currentLevel[game.levelProgress].y
            };      
            const distX = Math.abs(center.x - mouse.x);  
            const distY = Math.abs(center.y - mouse.y);  
            const radius = Math.sqrt((distX * distX) + (distY * distY));
            ch.drawCircle (center.x, center.y, radius, {
                stroke: settings.dotColor
            });
        }        
    }
}  

export default debugInfo;