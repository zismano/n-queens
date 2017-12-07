// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var counter = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i]) {
          counter++;
          if (counter === 2) {
            return true;
          }
        }
      }
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var counter = 0;
      // for each row
      for (var i = 0; i < this.attributes.n; i++) {
        //  if board[row][colIndex] is 1
        var row = this.get(i);
        if (row[colIndex]) {
          counter++;
          if (counter === 2) {
            // return true
            return true;          
          }
        }
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // for each column
      for (var i = 0; i < this.attributes.n; i++) {
        // if has conflict in columns, return true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // What about diagonal [0, 1] to [3, 2], [0, 2] to [3, 1] - recursive
      var counter = 0;
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        for (var i = 0; i < this.attributes.n - majorDiagonalColumnIndexAtFirstRow; i++) {
          var row = this.get(i);
          if (row[majorDiagonalColumnIndexAtFirstRow + i]) {
            counter++;
            if (counter === 2) {
              return true;
            }
          }
        }       
      } else {
         // if there's a mirror diagonal, then check it also
        for (var i = -majorDiagonalColumnIndexAtFirstRow, colIndex = 0; i < this.attributes.n; i++, colIndex++) {
          var row = this.get(i);
          if (row[colIndex]) {
            counter++;
            if (counter === 2) {
              return true;
            }
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
        if (this.hasMajorDiagonalConflictAt(-i)) {
          return true;
        }
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create coutner
      var counter = 0;
      var firstIndex = minorDiagonalColumnIndexAtFirstRow;
      // if input is 0 or more, 
      if (firstIndex > 0) {
        //for the first row until input 
        for (var i = 0; i <= firstIndex; i++) {
          //get row
          var row = this.get(i);
          //check row at index of input - row index
          if (row[firstIndex - i]) {
          //if true, counter ++
            counter++;
            //if counter === 2, return true
            if (counter === 2) {
              return true;
            }
          }
        }
      } else if (firstIndex < 0) {
        //else 
        //for row=-row until n, col = n-1; row++, col-- 
        for (var j = -firstIndex, colIndex = this.attributes.n - 1; j < this.attributes.n; j++, colIndex--) {
          //get row
          row = this.get(j);
          //check row at col
          if (row[colIndex]) {
            //if true
              //counter ++
            counter++;
              //if counter ===2, return true
            if (counter === 2) {
              return true;
            }
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      
      //apply the previous function to each possible start point in on the board
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasMinorDiagonalConflictAt(i) || this.hasMinorDiagonalConflictAt(-i)) {
          return true;
        }    
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
