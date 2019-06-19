class Cell{

    constructor(x,y,size,ID,cost = 0){
        this.ID = ID;
        this.x = x;
        this.y = y;
        this.size = size;
        this.neighbors = [];
        this.isVisited = false;
        this.isPath = false;
        this.isHovered = false;
        this.isForbidden = false;
        this.cameFrom = null;
        this.cost = cost;
        this.costSoFar = 99999;
        this.heuristicCost = 99999;
    }

    reset(){
        this.isVisited = false;
        this.isPath = false;
        this.isStart = false;
        this.isEnd = false;
        this.costSoFar = 99999;
        this.heuristicCost = 99999;
        this.cameFrom = null;
    }


    update(){

    }

    isHovered(mouseX,mouseY){
        if(mouseX > this.x * this.size &&
            mouseY > this.y * this.size &&
            mouseX < this.x * this.size + this.size && 
            mouseY <this.y * this.size + this.size)
                return true;
        return false;
    }

    render(context){
      //  context.strokeStyle = "#000000";
      //  context.strokeRect(this.x * this.size,this.y * this.size,this.size,this.size);
        this.isForbidden = false;
        switch(this.cost){
            case 1:
                context.fillStyle = "#dddddd";
                break;
            case 2:
                context.fillStyle = "#ffdddd";
                break;
            case 3:
                context.fillStyle = "#ffaaaa";
                break;
            case 4:
                context.fillStyle = "#dd2222";
                break;
            case 5:
                context.fillStyle = "#ff00ff";
                this.isForbidden = true;
                break;
        }
            

        context.fillRect((this.x * this.size),(this.y * this.size),this.size,this.size);

        
            if(this.isVisited)        
                context.fillStyle = "rgba(100,100,100,0.5)";

            if(this.isPath)
                context.fillStyle = "rgba(0,255,0,0.3)";

            if(this.isStart)
                context.fillStyle = "#0000ff";

            if(this.isEnd)
                context.fillStyle = "#ff0000";

            

            context.fillRect((this.x * this.size),(this.y * this.size),this.size,this.size);
        

        

        if(this.costSoFar != 99999){
            
          //  context.fillStyle = "#000000";
          //  context.fillText(this.costSoFar,this.x*this.size + this.size/4,this.y*this.size+this.size/4);

          //  context.fillStyle = "#ff00ff";
          //  context.fillText(this.heuristicCost,this.x*this.size + this.size*3/4,this.y*this.size+this.size/4);

            
          //  context.fillStyle = "#000000";
          //  context.fillText(this.heuristicCost + this.costSoFar,this.x*this.size + this.size/2,this.y*this.size+this.size/2);
        }
        
    }



}