document.addEventListener("DOMContentLoaded", function(){
    const MAIN = new Main();
    MAIN.CANVAS.addEventListener("mousemove",MAIN.mouseMove)
    MAIN.CANVAS.addEventListener("click",MAIN.mouseClick)
    MAIN.CANVAS.addEventListener("mousedown",MAIN.mouseDown)
    MAIN.CANVAS.addEventListener("mouseup",MAIN.mouseUp)
    MAIN.CANVAS.addEventListener("contextmenu",MAIN.contextMenu)
    
    MAIN.PLUS.addEventListener("click",MAIN.raiseValue);
    MAIN.MINUS.addEventListener("click",MAIN.reduceValue);
    function loop(){
        MAIN.loop();
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
});
 

