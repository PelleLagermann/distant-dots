function konami () {    
    let kkeys = [];
    const konami = "38,38,40,40,37,39,37,39,66,65";

    window.addEventListener("keydown", function(e){
        console.log("konami", e.keyCode, kkeys.toString());
        kkeys.push( e.keyCode );
        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
            game.cheatMode = true;
            kkeys = [];
        }            
    }, true);    
}

export default konami;