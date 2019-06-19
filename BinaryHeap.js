class HeapNode{
    constructor(key,element){
        this.key = key;
        this.element = element;
    }
}

class BinaryHeap{

    constructor(){
        this.nodes = [];
    }

    isEmpty(){
        return this.nodes.length === 0;
    }

    parent(i){
        return parseInt((i - 1) / 2);
    }

    left(i){
        return parseInt((2 * i + 1));
    }

    right(i){
        return parseInt((2 * i + 2));
    }

    extractMin(){
        if(this.nodes.length <= 0)
            return null;

        if(this.nodes.length == 1)
            return this.nodes.shift();

        let root = this.nodes[0];
        this.end = this.nodes.pop();
        this.nodes[0] = this.end;
        
        this.heapify(0); 
        return root;
    }

    insertElement(heapNode){
        this.nodes.push(heapNode);

        let i = this.nodes.length - 1;

        while(i != 0 && this.nodes[this.parent(i)].key > this.nodes[i].key){

            let aux = this.nodes[this.parent(i)];
            this.nodes[this.parent(i)] = this.nodes[i];
            this.nodes[i] = aux;

            i = this.parent(i);
        }
    }

    heapify(i){
        let l = this.left(i);
        let r = this.right(i);
        let smallest = i;


        if(l < this.nodes.length && this.nodes[l].key < this.nodes[i].key){
            smallest = l;
        }
            

        if(r < this.nodes.length && this.nodes[r].key < this.nodes[smallest].key){
            smallest = r;
        }

        if(smallest != i){
            let aux = this.nodes[i];
            this.nodes[i] = this.nodes[smallest];
            this.nodes[smallest] = aux;
            this.heapify(smallest);
        }
    }
    
}