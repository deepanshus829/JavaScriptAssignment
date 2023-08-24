const Cell = require("./cell");

class Board{

    constructor(){
        this.cells =[new Cell(), new Cell(), new Cell (), new Cell (), new Cell (),
                      new Cell (), new Cell(), new Cell(), new Cell() ];
    }


    isEmpty(cellNumber){
        return this.cells[cellNumber].isEmpty()
    }

     isWinner(){
        if(this.cells[0].getMark()==this.cells[1].getMark() 
        && this.cells[0].getMark()==this.cells[2].getMark() 
        && !this.cells[0].isEmpty()){
            return true
        }
        if(this.cells[3].getMark()==this.cells[4].getMark() 
        && this.cells[3].getMark()==this.cells[5].getMark() 
        && !this.cells[3].isEmpty()){
            return true
        }
        if(this.cells[6].getMark()==this.cells[7].getMark() 
        && this.cells[6].getMark()==this.cells[8].getMark() 
        && !this.cells[6].isEmpty()){
           
            return true
        }
        if(this.cells[0].getMark()==this.cells[3].getMark() 
        && this.cells[0].getMark()==this.cells[6].getMark() 
        && !this.cells[0].isEmpty()){
            return true
        }

        if(this.cells[1].getMark()==this.cells[4].getMark() 
        && this.cells[1].getMark()==this.cells[7].getMark() 
        && !this.cells[1].isEmpty()){
            return true
        }

        if(this.cells[2].getMark()==this.cells[5].getMark() 
        && this.cells[2].getMark()==this.cells[8].getMark() 
        && !this.cells[2].isEmpty()){
            return true
        }
        if(this.cells[0].getMark()==this.cells[4].getMark() 
        && this.cells[0].getMark()==this.cells[8].getMark() 
        && !this.cells[0].isEmpty()){
            return true
        }
        if(this.cells[2].getMark()==this.cells[4].getMark() 
        && this.cells[2].getMark()==this.cells[6].getMark() 
        && !this.cells[2].isEmpty()){
            return true
        }
        return false
     }

     drawChecker(){
        for(let i=0; i<this.cells.length;i++){
            if(this.cells[i].isEmpty()){
                return false
            }

        }
        return true

     }

     printBoard(){
        console.log(this.cells);
     }
}

module.exports=Board