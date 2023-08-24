class Cell{

    constructor(){
       this.mark='-'
    }

    isEmpty(){
        return this.mark=='-'
    }

    markCell(symbol){
       return this.mark=symbol
    }

    getMark(){
        return this.mark  
    }

}


module.exports = Cell