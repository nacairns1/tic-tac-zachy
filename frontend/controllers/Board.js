// Board represented by 2D array.
// Each cell in board is represented by a number.
// 0 = Empty
// 1 = Cell is an "X"
// 2 = Cell is an "O" as in Oscar

// **This prototype does not do any parameter checking.

class Board {
    #height;
    #width;
    #board;
    #isSolvedX;
    #isSolvedO;

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.isSolvedX = false;
        this.isSolvedO = false;

        const board_new_height = new Array(height);
        const board_new_width = new Array(width);
        this.board = board_new_height;
        for(var i = 0; i < height; i++) {
            this.board[i] = board_new_width;
        }

    }

    get height() {
        return this.height;
    }

    set height (height) {
        
    }

    get width() {
        return this.width;
    }

    set width (width) {

    }

    get isSolvedX() {
        return this.isSolvedX;
    }

    set isSolvedX(isSolvedX){

    }

    get isSolvedO() {
        return this.isSolvedO;
    }

    set isSolvedO(isSolvedO) {
        
    }


    isEmpty(row, col) {
        if(this.board[row][col] == 0) {
            return true;
        }
        return false;
    }

    isX(row, col) {
        if(this.board[row][col] == 1) {
            return true;
        }
        return false; 
    }

    isO(row, col) {
        if(this.board[row][col] == 2) {
            return true;
        }
        return false;
    }

    toggleEmpty(row, col) {
        this.board[row][col] = 0;
    }

    toggleX(row, col) {
        this.board[row][col] = 1; 

        // **** CHECK IF ISSOLVED for Xs
        if(row == col) {    // We are on a diagonal square, so check the diagonals. IE{(0,0), (1,1), (2,2)}
            // We know the current square at (row,col) is an X, so check either Up Diag or Down Diag
            // Hard coding this for 3x3 grid (classical) for now to test.
            var allXFlag = false;
            for(var x = 0; x < height; x++) {
                if(isX(x, x)) {
                    allXFlag = true;
                }
                else {
                    allXFlag = false;
                }
            }
            if(allXFlag) {
                isSolvedX = true;
            }
        }
        else {      // We are not on a diagonal so check current row or column. Ex: If row = 2, check that entire row
            var allXFlag = false;
            for(var x = 0; x < width; x++) {
                if(isX(row, x)) {
                    allXFlag = true;
                }
                else {
                    allXFlag = false;
                }
            }
            if(allXFlag) {
                isSolvedX = true; //This row is filled with all X's.
            }

            //Now check the column.
            for(var x = 0; x < height; x++) {
                if(isX(x, col)) {
                    allXFlag = true;
                }
                else {
                    allXFlag = false;
                }
            }
            if(allXFlag = true) {
                isSolvedX = true; //This column is filled with all X's.
            }
        }
    }

    toggleO(row, col) {
        this.board[row][col] = 2;
    
        // **** CHECK ISSOLVED for O's 
        if(row == col) {    // We are on a diagonal square, so check the diagonals. IE{(0,0), (1,1), (2,2)}
            // We know the current square at (row,col) is an X, so check either Up Diag or Down Diag
            // Hard coding this for 3x3 grid (classical) for now to test.
            var allOFlag = false;
            for(var x = 0; x < height; x++) {
                if(isO(x, x)) {
                    allOFlag = true;
                }
                else {
                    allOFlag = false;
                }
            }
            if(allXFlag) {
                isSolvedO = true;
            }
        }
        else {      // We are not on a diagonal so check current row or column. Ex: If row = 2, check that entire row
            var allOFlag = false;
            for(var x = 0; x < width; x++) {
                if(isO(row, x)) {
                    allOFlag = true;
                }
                else {
                    allOFlag = false;
                }
            }
            if(allXFlag) {
                isSolvedO = true; //This row is filled with all O's.
            }

            //Now check the column.
            for(var x = 0; x < height; x++) {
                if(isO(x, col)) {
                    allOFlag = true;
                }
                else {
                    allOFlag = false;
                }
            }
            if(allXFlag = true) {
                isSolvedO = true; //This column is filled with all O's.
            }
        }
    }

    clear() {
        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) {
                toggleEmpty(i, j);
            }
        }
    }
}



module.exports = {Board};