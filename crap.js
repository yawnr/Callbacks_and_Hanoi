var readline = require('readline');
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question("Which tower would you like to move a disk from, madame? (1, 2, or 3)", function (numString1) {
  reader.question("Where you tryna put that thing, bruh?", function (numString2) {
    var startTowerIdx = (parseInt(numString1) - 1);
    var endTowerIdx = (parseInt(numString2) - 1);
    callback(startTowerIdx, endTowerIdx);
  });
});
