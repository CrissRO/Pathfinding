class Pair{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function breadthFirstSearch(map,start,end){
    map.unVisit();
    let frontier = [];
    frontier.push(start);
    start.isVisited = true;
    start.cameFrom = null;
    
    while(frontier.length > 0 ){
        const CURENT = frontier.shift();
        
        if(CURENT.ID === end.ID)
            break;

        for(let i = 0;i<CURENT.neighbors.length;i++){            
            const NEIGHBOR = CURENT.neighbors[i];
            if(!NEIGHBOR.isVisited && !NEIGHBOR.isForbidden){

                NEIGHBOR.cameFrom = CURENT;
                NEIGHBOR.isVisited = true;
                frontier.push(NEIGHBOR);

            } 
        }
    }

    let curent = end.cameFrom;

    while(curent && curent.cameFrom){
        
        curent.isPath = true;
        curent = curent.cameFrom;
        
    }

    if(!curent)
            map.unVisit();
}


function dijkstra(map,start,end){
    map.unVisit();
    let frontier = new BinaryHeap();

    frontier.insertElement(new HeapNode(0,start));
    start.isVisited = true;
    start.costSoFar = 0;

    

    while(!frontier.isEmpty()){
        const CURENT = frontier.extractMin().element;
        
        if(CURENT.ID === end.ID)
            break;

        for(let i = 0;i<CURENT.neighbors.length;i++){
            const NEIGHBOR = CURENT.neighbors[i];

            
            let newCost = CURENT.costSoFar + NEIGHBOR.cost;
            
            if((!NEIGHBOR.isVisited || newCost < NEIGHBOR.costSoFar)&& !NEIGHBOR.isForbidden ){
                NEIGHBOR.costSoFar = newCost;
                NEIGHBOR.isVisited = true;
                NEIGHBOR.cameFrom = CURENT;
                frontier.insertElement(new HeapNode(newCost,NEIGHBOR));
            }

        }
    }

    let curent = end.cameFrom;

    while(curent && curent.cameFrom){
        
        curent.isPath = true;
        curent = curent.cameFrom;
        
    }
    
    if(!curent)
            map.unVisit();
    
}


function heuristic(a,b){
    let value  = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    console.log(Math.abs(a.x-b.x))
    //    console.log(value);
    return value;
}

function heuristicSearch(map,start,end){
    map.unVisit();
    let frontier = new BinaryHeap();
    start.isVisited = true;
    frontier.insertElement(new HeapNode(0,start));

    
    while(!frontier.isEmpty()){
        const CURENT = frontier.extractMin().element;

        if(CURENT.ID === end.ID)
            break;
                
        for(let i = 0;i < CURENT.neighbors.length;i++){

            const NEIGHBOR = CURENT.neighbors[i];
            
            if(!NEIGHBOR.isVisited && !NEIGHBOR.isForbidden){
                frontier.insertElement(new HeapNode(heuristic(end,NEIGHBOR),NEIGHBOR));
                NEIGHBOR.cameFrom = CURENT;
                NEIGHBOR.isVisited = true;
            }

        }
    }

    let curent = end.cameFrom;

    while(curent && curent.cameFrom){
        curent.cameFrom.isPath = true;
        curent = curent.cameFrom;
    }


    if(!curent)
        map.unVisit();

}



function aStar(map,start,end){
    map.unVisit();
    let frontier = new BinaryHeap();

    frontier.insertElement(new HeapNode(0,start));
    start.isVisited = true;
    start.costSoFar = 0;

    

    while(!frontier.isEmpty()){
        const CURENT = frontier.extractMin().element;
        
        if(CURENT.ID === end.ID)
            break;

        for(let i = 0;i<CURENT.neighbors.length;i++){
            const NEIGHBOR = CURENT.neighbors[i];

            
            let newCost = CURENT.costSoFar + NEIGHBOR.cost;
            
            if((!NEIGHBOR.isVisited || newCost < NEIGHBOR.costSoFar)&& !NEIGHBOR.isForbidden ){
                NEIGHBOR.costSoFar = newCost;
                NEIGHBOR.isVisited = true;
                NEIGHBOR.cameFrom = CURENT;
                NEIGHBOR.heuristicCost = heuristic(end,NEIGHBOR) * 1.1;
                let priority = newCost + heuristic(end,NEIGHBOR) * 1.1;
                frontier.insertElement(new HeapNode(priority,NEIGHBOR));
            }

        }
    }

    let curent = end.cameFrom;

    while(curent && curent.cameFrom){
        
        curent.isPath = true;
        curent = curent.cameFrom;
        
    }
    
    if(!curent)
            map.unVisit();
    
}
