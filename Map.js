class Map{


    constructor(rows,cols,size){
        this.COLS = cols;
        this.ROWS = rows;
        this.SIZE = size;
        this.mapMatrix = [];
        
        
        for(let y = 0; y < this.ROWS;y++){
            this.mapMatrix.push([]);
            for(let x = 0;x < this.COLS;x++)
                this.mapMatrix[y].push(new Cell(x,y,size,y * cols + x,1));
        }
            
        for(let y = 1; y < rows-1;y++)
            for(let x = 1;x < cols-1;x++){
                this.mapMatrix[y][x].neighbors.push(this.mapMatrix[y-1][x]);
                this.mapMatrix[y][x].neighbors.push(this.mapMatrix[y][x+1]);
                this.mapMatrix[y][x].neighbors.push(this.mapMatrix[y+1][x]);
                this.mapMatrix[y][x].neighbors.push(this.mapMatrix[y][x-1]);
            }

        for(let y = 1; y < rows-1;y++){
            this.mapMatrix[y][0].neighbors.push(this.mapMatrix[y-1][0]);
            this.mapMatrix[y][0].neighbors.push(this.mapMatrix[y][1]);
            this.mapMatrix[y][0].neighbors.push(this.mapMatrix[y+1][0]);
            
            this.mapMatrix[y][cols-1].neighbors.push(this.mapMatrix[y-1][cols-1]);
            this.mapMatrix[y][cols-1].neighbors.push(this.mapMatrix[y][cols-2]);
            this.mapMatrix[y][cols-1].neighbors.push(this.mapMatrix[y+1][cols-1]);
            
        }

        for(let x = 1; x < cols-1;x++){
            this.mapMatrix[0][x].neighbors.push(this.mapMatrix[0][x-1]);
            this.mapMatrix[0][x].neighbors.push(this.mapMatrix[1][x]);
            this.mapMatrix[0][x].neighbors.push(this.mapMatrix[0][x+1]);

            this.mapMatrix[rows-1][x].neighbors.push(this.mapMatrix[rows-1][x-1]);
            this.mapMatrix[rows-1][x].neighbors.push(this.mapMatrix[rows-2][x]);
            this.mapMatrix[rows-1][x].neighbors.push(this.mapMatrix[rows-1][x+1]);
        }

        this.mapMatrix[0][0].neighbors.push(this.mapMatrix[0][1]);
        this.mapMatrix[0][0].neighbors.push(this.mapMatrix[1][0]);

        this.mapMatrix[0][cols-1].neighbors.push(this.mapMatrix[0][cols-2]);
        this.mapMatrix[0][cols-1].neighbors.push(this.mapMatrix[1][cols-1]);

        this.mapMatrix[rows-1][0].neighbors.push(this.mapMatrix[rows-2][0]);
        this.mapMatrix[rows-1][0].neighbors.push(this.mapMatrix[rows-1][1]);

        this.mapMatrix[rows-1][cols-1].neighbors.push(this.mapMatrix[rows-1][cols-2]);
        this.mapMatrix[rows-1][cols-1].neighbors.push(this.mapMatrix[rows-2][cols-1]);       
    }

    unVisit(){
        
        for(let y = 0; y < this.ROWS;y++)
            for(let x = 0;x < this.COLS;x++)
                this.mapMatrix[y][x].reset();
            
                
        
    }

    update(){
        /*
        for(let y = 0; y < this.ROWS;y++)
            for(let x = 0;x < this.COLS;x++){
                this.mapMatrix[y][x].canUpdate = true;
            }
            */
    }

    render(context){
        
        for(let y = 0; y < this.ROWS;y++)
            for(let x = 0;x < this.COLS;x++)
                this.mapMatrix[y][x].render(context);

        
    }

}