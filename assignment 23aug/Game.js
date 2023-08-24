const Board = require("./board")
const Player = require("./player")

class Game {

    constructor(player0, player1, board) {
        this.player0 = player0
        this.player1 = player1
        this.board = board
        this.isGameEnded = false
        this.turn = 0


    }
    static newGame(player0Name, player1Name) {
        let player0 = new Player(player0Name, 'X')
        let player1 = new Player(player1Name, 'O')
        let board = new Board()
        if (player0Name == player1Name || typeof player0.name != 'string' || typeof player1.name != 'string') {
            return ['Enter valid string', null]
        }

        return [new Game(player0, player1, board)]  
    }

    play(cellNumber) {

        if (this.isGameEnded) {
            return 'Game over'
        }
        if (typeof cellNumber != 'number' || cellNumber < 0 || cellNumber > 8) {  // checking no is int or also in range

            return 'The cellNumber is not present in the cell'
        }
        let isCellEmpty = this.board.isEmpty(cellNumber)

        if (!isCellEmpty) {
            return '----Cell is marked----'
        }

        let currentPlayer
        if (this.turn % 2 == 0) {
            currentPlayer = this.player0

        }
        else {
            currentPlayer = this.player1
        }

        currentPlayer.markCell(this.board.cells[cellNumber])

        this.turn++;
        this.board.printBoard()

        if (this.board.isWinner()) {
            this.isGameEnded = true
            return `${currentPlayer.name} is the  winner`
        }
        if (this.board.drawChecker()) {
            this.isGameEnded = true
            return "Its a Draw"
        }
        return 'Continue Playing'

    }
}
module.exports = Game