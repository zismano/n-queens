/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// NOT untoggle all row
// toggle a piece
// run check
// untoggle a piece


window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var num = n;
//create array of arrays
  var board = new Board({'n': n});
  var renderRookSolution = function(r) {
    // check each column in row, and set to 0 ??
 //   for (var i = 0; i < num; i++) {
    // for each column, toggle board[r][c]
    // if it's last row, run test
    // else, call all function with r++
      var row = [];
   //   console.log(row, i, row[i]);
      // if (row[i] === undefined) {
      //   debugger;
      // }
      // if (row[i] === 1) {
      //   board.togglePiece(r, i);
      // }
      for (var i = 0; i < num; i++) {
        row.push(0);
      }
      board.set(r, row);
   // }
    for (var i = 0; i < num; i++) {
      board.togglePiece(r, i);
      if (r < num) {
        reutrn renderRookSolution(r + 1);
      } else {
        // run test
        console.log(board);
      }      
    }
  };
  renderRookSolution(0);
};


  //  if (r === num) {
  //     console.log(board);
  //     return;
  //   }
  //   // 
  //   for (var i = 0; i < num; i++) {

  //   }
  // };





//create helper function to recursively add rooks
  // var renderRookSolution = function(positionArray, n) {
    if (n === 0) {
      //run tests on this array
  //   console.log(positionArray);
   //   return positionArray;
      // solution.push(positionArray);
      console.log(positionArray);
      return positionArray;
    }
    for (var j = 0; j < num; j++) {
      var newRow = [];
      for (var i = 0; i < num; i ++) {
        newRow.push(0);
      }
      if (j === 0) {
        newRow[j] = 1;
        //positionArray.push(newRow);
      } else {
        //newRow[j - 1] = 0;
        newRow[j] = 1;
        //positionArray[j] = newRow;
        positionArray.pop();
      }      
      positionArray.push(newRow);
     // positionArray[newRow[j]] = 1;
      renderRookSolution(positionArray, n - 1);
    }
  };
  renderRookSolution([], n);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//  return solution;
//};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};