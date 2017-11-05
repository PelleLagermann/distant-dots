import Dot from "./dot";

function generateLevel() {
    let numberOfDots = settings.baseDots + (game.level * settings.dotIncrease),
        dots = [];

    for (let i = 0; i < numberOfDots; i++) {        
        let invalidDot = true;

        while (invalidDot) {
            const dot = generateDot();
            let smallestDistance = 9007199254740991;

            for (let j = 0; j < dots.length; j++) {
                const distance = getDistance(dots[j], dot);
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                }
            }

            if (smallestDistance >= settings.dotRadius) {
                dots.push(dot);
                invalidDot = false;
            }            
        }        
    }    
    
    const level = sortLevel(dots);       

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

function generateDot () {
    const x = getRandomInt(settings.padding, canvas.width - settings.padding);
    const y = getRandomInt(settings.padding, canvas.height - settings.padding);                
    return new Dot(x, y, settings.dotColor);
}

function getDistance (dot1, dot2) {
    const distX = Math.abs(dot1.x - dot2.x);
    const distY = Math.abs(dot1.y - dot2.y);
    return Math.sqrt((distX * distX) + (distY * distY));
}

function sortLevel (dots) {
    let sorted = [];
    const startDot = new Dot (Math.round(canvas.width / 2), Math.round(canvas.height / 2), settings.dotColor, "rgba(0, 0, 0, 1)");
    startDot.distance = 0;
    startDot.togglePulse();
    sorted.push(startDot);    

    let curDot = sorted[0];
    while (dots.length) {        
        let closestDot = {
            i: null,
            distance: 9007199254740991 
        };

        for (let i = 0; i < dots.length; i++) {            
            let distance = getDistance(curDot, dots[i]);
            
            //Hvis distance < minimun : erstat dot og sort igen
            
            if (distance < closestDot.distance) {                
                closestDot = {
                    i: i,
                    distance: distance
                };
            }           
        }        

        let cd = dots.splice(closestDot.i, 1)[0];        
        cd.distance = closestDot.distance;                
        const colorId = "rgb(" + (sorted.length) +", 0, 0)";
        cd.colorId = colorId;
        sorted.push(cd);
        curDot = sorted[sorted.length - 1];
    } 

    return sorted;
}

export default generateLevel;