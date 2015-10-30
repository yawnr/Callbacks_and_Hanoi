function Clock () {

  this.time = new Date();
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  var hours = this.time.getHours();
  var minutes = this.time.getMinutes();
  var seconds = this.time.getSeconds();
  console.log(
    hours + ":" + minutes + ":" + seconds
  );
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  // 2. Call printTime.
  this.printTime.call(this);
  // 3. Schedule the tick interval.
  setInterval(this._tick.bind(this),Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  this.time.setSeconds(this.time.getSeconds() + 5);
  // 2. Call printTime.
  this.printTime.call(this);
};

var clock = new Clock();
// clock.run();

//_______________________________________________________________

var readline = require('readline');
reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, callback){
  if(numsLeft == 0){
    callback(sum);
  }
  else if (numsLeft > 0){
    reader.question("Enter a number sucka!", function(numString){
      var num = parseInt(numString);
      sum += num;
      console.log("Partial sum is " + sum)
      return addNumbers(sum, numsLeft - 1, callback);
    });
  }
};

// addNumbers(0, 3, function(sum) {
//   console.log("Final sum " + sum);
// });

// _______________________________________________________________

var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question("Compare " + el1 + " > " + el2 + " ?", function(answer){
     if(answer == "yes"){
       callback(true);
     } else {
       callback(false);
     }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if(i < arr.length - 1){
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan){
      if (isGreaterThan){
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, (i + 1), madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  var madeAnySwaps = true

  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    if (madeAnySwaps){
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(madeAnySwaps)
  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
