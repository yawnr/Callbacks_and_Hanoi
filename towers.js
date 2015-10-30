var readline = require('readline');
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame () {
  this.towers = [[3,2,1], [], []];
};

HanoiGame.prototype.isWon = function () {
  if ((this.towers[1].length === 3) || (this.towers[2].length === 3)){
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  if(this.towers[startTowerIdx][0] === undefined){
    return false;
  } else {
    console.log(this.towers);
    console.log(this.towers[startTowerIdx]);
    var moveDisk = this.towers[startTowerIdx][(this.towers[startTowerIdx].length - 1)];
      console.log(moveDisk);
    if(this.towers[endTowerIdx][0] === undefined){
      return true;
    } else {
      var targetDisk = this.towers[endTowerIdx][(this.towers[endTowerIdx].length - 1)];
      console.log(moveDisk < targetDisk);
      if(moveDisk < targetDisk){
        return true;
      } else {
        return false;
      }
    }
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  console.log(this)
  if(this.isValidMove.call(this, startTowerIdx, endTowerIdx)){
    var disk = this.towers[startTowerIdx].pop();
    this.towers[endTowerIdx].push(disk);
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  var gameState = JSON.stringify(this.towers);
  console.log(gameState);
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();

  reader.question("Which tower would you like to move a disk from, madame? (1, 2, or 3)", function (numString1) {
    reader.question("Where you tryna put that thing, bruh?", function (numString2) {
      var startTowerIdx = (parseInt(numString1) - 1);
      var endTowerIdx = (parseInt(numString2) - 1);
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  //
  this.promptMove(function (startTowerIdx, endTowerIdx) {
    var moved = this.move(startTowerIdx, endTowerIdx);
    if (moved) {
      if (this.isWon()) {
        completionCallback();
      } else {
        this.run(completionCallback);
      }

    } else {
      console.log("Invalid move.");
      this.run(completionCallback);
    }

  }.bind(this));

};

var Hanoi = new HanoiGame();

Hanoi.run(function () {
  console.log("You won!");
  reader.close();
});
