function helpers () {
    this.drawRect = function (x, y, width, height, color, hitColor) {        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);

        if (typeof hitColor !== "undefined") {
            hitCtx.fillStyle = hitColor;
            hitCtx.fillRect(x, y, width, height);
        }
    }

    this.drawCircle = function (x, y, radius, settings) {
        settings = settings || {};
        const s = {
            fill: settings.fill || null,
            stroke: settings.stroke || null,
            lineWidth: settings.lineWidth || 2,
            hitColor: settings.hitColor || null
        };
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        
        if (s.fill) {
            ctx.fillStyle = s.fill;        
            ctx.fill();
        }
        
        if (s.stroke) {
            ctx.lineWidth = s.lineWidth;
            ctx.strokeStyle = s.stroke;
            ctx.stroke();
        }        

        if (!!s.hitColor) {
            hitCtx.fillStyle = s.hitColor;
            hitCtx.beginPath();
            hitCtx.arc(x, y, radius, 0, Math.PI*2, true);
            hitCtx.fill();
        }
    }

    this.drawText = function (x, y, text, fontSettings) {
        fontSettings = fontSettings || {};
        const fs = {
            color: fontSettings.color || settings.dotColor,
            size: fontSettings.size || "20px",
            family: fontSettings.family || "Orbitron",
            align: fontSettings.align || "left",
            baseLine: fontSettings.baseLine || "middle",
            letterSpacing: fontSettings.letterSpacing || "0px"
        };
        
        canvas.style.letterSpacing = fs.letterSpacing;
        ctx.textAlign = fs.align; 
        ctx.baseLine = fs.baseLine;

        ctx.font = fs.size + " '" + fs.family + "'";
        ctx.fillStyle = fs.color;
        ctx.fillText(text, x, y);
    }

    this.drawPath = function (startX, startY, endX, endY, dashed) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = settings.dotColor;
        ctx.beginPath();
        if (dashed) {
            ctx.setLineDash([5, 15]);
        } else {
            ctx.setLineDash([0, 0]);
        }
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

const ch = new helpers();

export default ch;
