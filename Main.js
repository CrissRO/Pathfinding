class Main{
    constructor(){
        this.CANVAS = null;
        this.WIDTH = 800;
        this.HEIGHT = 600;
        this.CONTEXT = null;
        this.PLUS = null;
        this.MINUS = null;
        this.VALUE = null;

        this.CELL_SIZE = 25;

        let rows = parseInt(this.HEIGHT / this.CELL_SIZE);
        let cols = parseInt(this.WIDTH / this.CELL_SIZE);
        this.MAP = new Map(rows,cols,this.CELL_SIZE);

        
        this.startX = 0;
        this.startY = 0;


        this.endX = 0;
        this.endY = 0;

        this.blockValue = 1;
        this.blockLimit = 6;

        this.mouseX;
        this.mouseY;
        this.button;
        this.mousePressed = false;
        this.startIsNext = true;
        this.setup();

        
    }

    contextMenu(event){
        event.preventDefault();
    }
    
    mouseDown(event){
        event.preventDefault();

        let MAIN = this.MAIN;
        MAIN.mousePressed = true;
        MAIN.button = event.which || event.button;
        

    }
    raiseValue(){

        this.MAIN.blockValue %= this.MAIN.blockLimit;
        this.MAIN.blockValue += 1;
        this.MAIN.VALUE.innerHTML = this.MAIN.blockValue;
        
    }

    reduceValue(){

        this.MAIN.blockValue -= 1;
        this.MAIN.blockValue = this.MAIN.blockValue <= 1 ? 1: this.MAIN.blockValue
        this.MAIN.VALUE.innerHTML = this.MAIN.blockValue;
    }

    mouseUp(event){
        event.preventDefault();
        let MAIN = this.MAIN;
        MAIN.mousePressed = false;
    }

    mouseMove(event){
        this.MAIN.mouseX = event.offsetX;
        this.MAIN.mouseY = event.offsetY;
        
    }

    mouseClick(event){
        event.preventDefault();
        let MAIN = this.MAIN;
        
        if(MAIN.startIsNext){
            MAIN.startX = parseInt(event.offsetX / MAIN.CELL_SIZE);
            MAIN.startY = parseInt(event.offsetY / MAIN.CELL_SIZE);
            MAIN.MAP.unVisit();
            MAIN.MAP.mapMatrix[MAIN.startY][MAIN.startX].isStart = true;
        }
        else{
            MAIN.endX = parseInt(event.offsetX / MAIN.CELL_SIZE);
            MAIN.endY = parseInt(event.offsetY / MAIN.CELL_SIZE);
            aStar(MAIN.MAP,MAIN.MAP.mapMatrix[MAIN.startY][MAIN.startX],MAIN.MAP.mapMatrix[MAIN.endY][MAIN.endX]);
            MAIN.MAP.mapMatrix[MAIN.startY][MAIN.startX].isStart = true;
            MAIN.MAP.mapMatrix[MAIN.endY][MAIN.endX].isEnd = true;

        }
        
        MAIN.startIsNext = !MAIN.startIsNext;
    }

    setup(){
        
        this.CANVAS = document.createElement("Canvas");
        this.CANVAS.width = this.WIDTH;
        this.CANVAS.height = this.HEIGHT;
        this.CANVAS.setAttribute("id","canvas");
        if(!this.CANVAS)
            return;
        document.querySelector('body').appendChild(this.CANVAS);
        this.CONTEXT = this.CANVAS.getContext("2d");
        this.CANVAS.MAIN = this;

        this.PLUS = document.querySelector("#plus");
        this.MINUS = document.querySelector("#minus");
        this.VALUE = document.querySelector("#value");

        this.PLUS.MAIN = this;
        this.MINUS.MAIN = this;
        this.VALUE.MAIN = this;

        this.VALUE.innerHTML = this.blockValue;
        
    }

    update(){

        
        let X = parseInt(this.mouseX / this.CELL_SIZE);
        let Y = parseInt(this.mouseY / this.CELL_SIZE);
        //console.log(this.button)
        if(this.button == 3 && this.mousePressed === true){
            for(let r = Y;r <= Y;r++)
                for(let c = X;c <= X;c++)
                    if(r >= 0 && r < this.MAP.ROWS &&
                        c >= 0 && c < this.MAP.COLS && 
                        this.MAP.mapMatrix[r][c]){
                            //this.MAP.mapMatrix[r][c].isForbidden = true;    
                            this.MAP.mapMatrix[r][c].cost = this.blockValue;    
                        }
                        
                
            
            this.MAP.mapMatrix[Y][X].canUpdate = false;
        }
            

        this.MAP.update();
        
    }

    render(){
        this.MAP.render(this.CONTEXT);
    }

    loop(){
            this.update();
            this.render();
            
    }
}