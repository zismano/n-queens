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



window.findNRooksSolution = function(n) {
  var solution = []; 
  var board = new Board({n:n});
  var renderNRookSolution = function(r) {
    if (r === n) {
      for (var i = 0; i < n; i++) {
        solution[i] = board.get(i);
      }
      return solution;
    }
    for (var i = 0; i < n; i++) { 
      board.togglePiece(r, i);
      if (!board.hasAnyColConflicts()) {
        return renderNRookSolution(r + 1);
        board.togglePiece(r, i);
      } else {
        board.togglePiece(r, i);
      }
    }
  }
  solution = renderNRookSolution(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var solutions = []; 
  var solution = []
  var board = new Board({n:n});
  var renderNRookSolution = function(r) {
    if (r === n) {
      for (var i = 0; i < n; i++) {
        solution[i] = board.get(i).slice(0);
      }
      solutions.push(solution);
      return solutions;
    }
    for (var i = 0; i < n; i++) { 
      board.togglePiece(r, i);
      if (!board.hasAnyColConflicts()) {
        renderNRookSolution(r + 1);
        board.togglePiece(r, i);
      } else {
        board.togglePiece(r, i);
      }
    }
  }
  renderNRookSolution(0);
  solutionCount = solutions.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; 
  var board = new Board({n:n});
  var renderNQueensSolution = function(r) {
    if (r === n) {
      for (var i = 0; i < n; i++) {
        solution[i] = board.get(i);
      }
      return solution;
    }
    for (var i = 0; i < n; i++) { 
      board.togglePiece(r, i);
      if (!board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && 
        !board.hasAnyMinorDiagonalConflicts()) {
        return renderNQueensSolution(r + 1);
        board.togglePiece(r, i);
      } else {
        board.togglePiece(r, i);
      }
    }
  }
  solution = renderNQueensSolution(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
