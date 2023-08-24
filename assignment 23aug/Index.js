const Game = require("./game");

let [g1]= Game.newGame("aaaa","bbb")
//console.log(g1)

console.log(g1.play(0))
console.log(g1.play(2))
console.log(g1.play(2))
console.log(g1.play(6))
console.log(g1.play(8))
console.log(g1.play(3))