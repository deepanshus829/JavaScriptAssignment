const Board=require("./board")

class Player
{
    constructor(name,symbol){
        this.name=name;
        this.symbol=symbol;
    }
    
    markCell(cellMarker){
        cellMarker.markCell(this.symbol) 
    }

}
module.exports= Player