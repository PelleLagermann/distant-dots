!function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var a={};t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}([function(e,t){var a;a=function(){return this}();try{a=a||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(a=window)}e.exports=a},function(e,t,a){"use strict";function n(){this.drawRect=function(e,t,a,n,i,r){ctx.fillStyle=i,ctx.fillRect(e,t,a,n),void 0!==r&&(hitCtx.fillStyle=r,hitCtx.fillRect(e,t,a,n))},this.drawCircle=function(e,t,a,n){n=n||{};var i={fill:n.fill||null,stroke:n.stroke||null,lineWidth:n.lineWidth||2,hitColor:n.hitColor||null};ctx.beginPath(),ctx.arc(e,t,a,0,2*Math.PI,!0),i.fill&&(ctx.fillStyle=i.fill,ctx.fill()),i.stroke&&(ctx.lineWidth=i.lineWidth,ctx.strokeStyle=i.stroke,ctx.stroke()),i.hitColor&&(hitCtx.fillStyle=i.hitColor,hitCtx.beginPath(),hitCtx.arc(e,t,a,0,2*Math.PI,!0),hitCtx.fill())},this.drawText=function(e,t,a,n){n=n||{};var i={color:n.color||settings.dotColor,size:n.size||"20px",family:n.family||"Orbitron",align:n.align||"left",baseLine:n.baseLine||"middle",letterSpacing:n.letterSpacing||"0px"};canvas.style.letterSpacing=i.letterSpacing,ctx.textAlign=i.align,ctx.baseLine=i.baseLine,ctx.font=i.size+" '"+i.family+"'",ctx.fillStyle=i.color,ctx.fillText(a,e,t)},this.drawPath=function(e,t,a,n,i){ctx.lineWidth=3,ctx.strokeStyle=settings.dotColor,ctx.beginPath(),i?ctx.setLineDash([5,15]):ctx.setLineDash([0,0]),ctx.moveTo(e,t),ctx.lineTo(a,n),ctx.stroke()}}Object.defineProperty(t,"__esModule",{value:!0});var i=new n;t.default=i},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={mousePosition:function(){var e="x: "+mouse.x+" - y: "+mouse.y;ch.drawText(20,40,e,"hotpink")},hoverDotIndex:function(){var e=hitCtx.getImageData(mouse.x,mouse.y,1,1).data,t="rgb("+e[0]+","+e[1]+","+e[2]+")";ch.drawText(20,80,"Color: "+t,"hotpink")},hoverRadius:function(){if(1===game.state){var e={x:currentLevel[game.levelProgress].x,y:currentLevel[game.levelProgress].y},t=Math.abs(e.x-mouse.x),a=Math.abs(e.y-mouse.y),n=Math.sqrt(t*t+a*a);ch.drawCircle(e.x,e.y,n,{stroke:settings.dotColor})}}};t.default=n},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={update:function(){ch.drawText(canvas.width/2,canvas.height/2-100,"GAME OVER",{size:"80px",align:"center",letterSpacing:"50px"}),ch.drawText(canvas.width/2,canvas.height/2,"Score: "+game.score,{size:"60px",align:"center",letterSpacing:"30px"}),ch.drawText(canvas.width/2,canvas.height/2+30,"Personal best: "+game.highscore,{size:"20px",align:"center",letterSpacing:"5px"}),ch.drawText(canvas.width/2,canvas.height/2+100,"[Click for next level]",{size:"40px",align:"center",letterSpacing:"10px"})},clickHandler:function(){initGame(),generateLevel()}};t.default=n},function(e,t,a){"use strict";function n(){ch.drawText(canvas.width/2,canvas.height/2,"Score: "+game.score,{size:"80px",align:"center",letterSpacing:"50px"}),ch.drawText(canvas.width/2,canvas.height/2+100,"[Click for next level]",{size:"40px",align:"center",letterSpacing:"10px"})}function i(){for(var e=0;e<currentLevel.length;e++){var t=currentLevel[e];ch.drawCircle(t.x,t.y,t.radius,{fill:settings.dotColor,hitColor:t.colorId})}}function r(){for(var e=1;e<=game.levelProgress;e++)ch.drawPath(currentLevel[e-1].x,currentLevel[e-1].y,currentLevel[e].x,currentLevel[e].y,!0)}function s(){ch.drawPath(currentLevel[game.levelProgress].x,currentLevel[game.levelProgress].y,mouse.x,mouse.y)}Object.defineProperty(t,"__esModule",{value:!0});var l={update:function(){1===game.state&&(i(),r(),s()),2===game.state&&n()},clickHandler:function(e){if(1===game.state){var t=hitCtx.getImageData(mouse.x,mouse.y,1,1).data;if(t[1]+t[2]===0){t[0]===game.levelProgress+1?(currentLevel[game.levelProgress].togglePulse(),game.levelProgress++,currentLevel[game.levelProgress].togglePulse(),game.levelProgress===currentLevel.length-1&&(game.score+=currentLevel.length-1,game.state=2)):(game.state=-1,game.highscore<game.score&&(game.highscore=game.score,localStorage.setItem("highscore",game.score)))}}else 2===game.state&&generateLevel()}};t.default=l},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={update:function(){ch.drawText(canvas.width/2,canvas.height/2,"Distant Dots",{size:"80px",align:"center",letterSpacing:"50px"}),ch.drawText(canvas.width/2,canvas.height/2+100,"[Click to start a new game]",{size:"40px",align:"center",letterSpacing:"10px"})},clickHandler:function(){generateLevel()}};t.default=n},function(e,t,a){"use strict";(function(e){function n(){for(var t=settings.baseDots+game.level*settings.dotIncrease,a=[],n=0;n<t;n++){var s=i(settings.padding,canvas.width-settings.padding),o=i(settings.padding,canvas.height-settings.padding);a.push(new l.default(s,o))}var c=r();game.level++,game.levelProgress=0,e.currentLevel=c,game.state=1}function i(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}function r(){var e=[],t=new l.default(Math.round(canvas.width/2),Math.round(canvas.height/2),"rgba(0, 0, 0, 1)");t.distance=0,t.togglePulse(),e.push(t);for(var a=e[0];dots.length;){for(var n={i:null,distance:9007199254740991},i=0;i<dots.length;i++){var r=Math.abs(a.x-dots[i].x),s=Math.abs(a.y-dots[i].y),o=Math.sqrt(r*r+s*s);o<n.distance&&(n={i:i,distance:o})}var c=dots.splice(n.i,1)[0];c.distance=n.distance;var u="rgb("+level.length+", 0, 0)";c.colorId=u,e.push(c),a=level[level.length-1]}return e}Object.defineProperty(t,"__esModule",{value:!0});var s=a(8),l=function(e){return e&&e.__esModule?e:{default:e}}(s);t.default=n}).call(t,a(0))},function(e,t,a){"use strict";function n(){var e=[];window.addEventListener("keydown",function(t){console.log("konami",t.keyCode,e.toString()),e.push(t.keyCode),e.toString().indexOf("38,38,40,40,37,39,37,39,66,65")>=0&&(game.cheatMode=!0,e=[])},!0)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=function(){function e(t,a,i){n(this,e),this.x=t,this.y=a,this.colorId=i,this.r=settings.dotRadius,this.rMin=this.r,this.rMax=2*this.r,this.pulse=!1,this.pulseModifier=.2,this.distance}return i(e,[{key:"togglePulse",value:function(){this.pulse=!this.pulse,this.pulse||(this.r=settings.dotRadius)}},{key:"radius",get:function(){return(this.r>this.rMax||this.r<this.rMin)&&(this.pulseModifier=-1*this.pulseModifier),this.pulse&&(this.r=this.r+this.pulseModifier),this.r}}]),e}();t.default=r},function(e,t,a){"use strict";(function(e){function t(e){return e&&e.__esModule?e:{default:e}}function n(){var e=ctx.createLinearGradient(canvas.width,0,0,canvas.height);e.addColorStop(0,"#00202F"),e.addColorStop(1,"#00314C"),ctx.fillStyle=e,ctx.fillRect(0,0,canvas.width,canvas.height),hitCtx.fillStyle="white",hitCtx.fillRect(0,0,canvas.width,canvas.height)}function i(){n(),0===game.state?d.default.update():1===game.state||2===game.state?(g.default.update(),game.cheatMode&&p.default.hoverRadius()):-1===game.state&&v.default.update(),game.debug&&(p.default.mousePosition(),p.default.hoverDotIndex(),p.default.hoverRadius())}function r(){canvas.width=window.innerWidth,canvas.height=window.innerHeight,hitCanvas.width=window.innerWidth,hitCanvas.height=window.innerHeight}var s=a(1),l=t(s),o=a(6),c=t(o),u=a(5),d=t(u),h=a(4),g=t(h),f=a(3),v=t(f),x=a(2),p=t(x),m=a(7),w=t(m);e.canvas=document.getElementById("gameCanvas"),e.ctx=canvas.getContext("2d"),e.hitCanvas=document.getElementById("hitCanvas"),e.hitCtx=hitCanvas.getContext("2d"),e.ch=l.default,e.generateLevel=c.default,e.settings={debug:!1,fps:50,baseDots:5,dotIncrease:3,padding:20,dotRadius:10,dotColor:"#A4EED6"},e.mouse={x:0,y:0},e.initGame=function(){var t=localStorage.getItem("highscore")||0;e.game={state:0,score:0,level:0,levelProgress:0,highscore:t}},initGame(),r(),window.addEventListener("resize",r,!1),canvas.addEventListener("click",function(e){0===game.state?d.default.clickHandler(e):1===game.state||2===game.state?g.default.clickHandler(e):-1===game.state&&v.default.clickHandler()}),canvas.addEventListener("mousemove",function(e){var t=canvas.getBoundingClientRect(),a=document.documentElement;mouse.x=e.clientX-t.left-a.scrollLeft,mouse.y=e.clientY-t.top-a.scrollTop}),(0,w.default)(),setInterval(i,1e3/settings.fps)}).call(t,a(0))}]);