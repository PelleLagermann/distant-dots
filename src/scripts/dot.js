class Dot {
    constructor(x, y, color, colorId) {
        this.x = x;
        this.y = y;      
        this.color = color;
        this.colorId = colorId;
        this.r = settings.dotRadius;
        this.rMin = this.r;
        this.rMax = this.r * 2;        
        this.pulse = false;
        this.pulseModifier = 0.2;
        this.distance;
    }    
    
    get radius () {                
        if (this.r > this.rMax || this.r < this.rMin) {
            this.pulseModifier = this.pulseModifier * -1;
        }        

        if (this.pulse) {
            this.r = this.r + this.pulseModifier;
        }
        
        return this.r;
    }

    togglePulse () {        
        this.pulse = !this.pulse;

        if (!this.pulse) {
            this.r = settings.dotRadius;
        }
    }
} 

export default Dot;