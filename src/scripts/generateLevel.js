import Dot from "./dot";

function generateLevel() {
    let numberOfDots = settings.baseDots + (game.level * settings.dotIncrease),
        dots = [];

    for (let i = 0; i < numberOfDots; i++) {
        const x = getRandomInt(settings.padding, canvas.width - settings.padding);
        const y = getRandomInt(settings.padding, canvas.height - settings.padding);                
        dots.push(new Dot(x, y));
    }

    //Sort level
    let level = [];
    const startDot = new Dot (Math.round(canvas.width / 2), Math.round(canvas.height / 2), "rgba(0, 0, 0, 1)");
    startDot.distance = 0;
    startDot.togglePulse();
    level.push(startDot);    

    let curDot = level[0];
    while (dots.length) {        
        let closestDot = {
            i: null,
            distance: 9007199254740991 
        };

        for (let i = 0; i < dots.length; i++) {
            const distX = Math.abs(curDot.x - dots[i].x);
            const distY = Math.abs(curDot.y - dots[i].y);
            let distance = Math.sqrt((distX * distX) + (distY * distY));
            
            if (distance < closestDot.distance) {                
                closestDot = {
                    i: i,
                    distance: distance
                };
            }           
        }        

        let cd = dots.splice(closestDot.i, 1)[0];        
        cd.distance = closestDot.distance;                
        const colorId = "rgb(" + (level.length) +", 0, 0)";
        cd.colorId = colorId;
        level.push(cd);
        curDot = level[level.length - 1];
    }    

    game.level++;  
    game.levelProgress = 0;  
    global.currentLevel = level;
    game.state = 1;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default generateLevel;