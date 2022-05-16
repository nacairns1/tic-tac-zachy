// Board represented by 2D array.
// Each cell in board is represented by a number.
// 0 = Empty
// 1 = Cell is an "X"
// 2 = Cell is an "O" as in Oscar

// **This prototype does not do any parameter checking.

class Board {


    constructor(height, width) {
        this.height = 3;
        this.width = 3;
        this.isSolvedX = false;
        this.isSolvedO = false;
        this.board = new Array
            (
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            );

    }

    //#region Getters and Setters to potentially reintroduce
    // get height() {
    //     return height;
    // }

    // set height (height) {

    // }

    // get width() {
    //     return width;
    // }

    // set width (width) {

    // }

    // get isSolvedX() {
    //     return isSolvedX;
    // }

    // set isSolvedX(isSolvedX){

    // }

    // get isSolvedO() {
    //     return isSolvedO;
    // }

    // set isSolvedO(isSolvedO) {

    // }

    // get board() {
    //     return board;
    // }

    // set board(board) {

    // }
    //#endregion


    isEmpty(row, col) {
        console.log(`checking isEmpty for ${row} and ${col}.`);

        if (this.board[row][col] === 0) {
            return true;
        }
        return false;
    }

    isX(row, col) {
        return (this.board[row][col] === 1);
    }

    isO(row, col) {
        return (this.board[row][col] === 2);

    }

    toggleEmpty(row, col) {
        this.board[row][col] = 0;
    }

    toggleX(row, col) {
        this.board[row][col] = 1;
        let allXFlag = false;

        //check row for all X's
        for (let i = 0; i < this.width; i++) {
            if (!this.isX(row, i)) {
                console.log(`NOT X piece found at ${row} and ${this.isO}`);
                allXFlag = false;
                break;
            };
            allXFlag = true;
        }

        console.log(`X solved after row check? ${allXFlag}`);
        if(allXFlag) return this.isSolvedX = true;

        //Now check the column.
        for (let i = 0; i < this.height; i++) {
            if (!this.isX(i, col)) {
                console.log(`NOT X piece found at ${i} and ${col}`);
                allXFlag = false;
                break;
            };
            allXFlag = true;
        }
        console.log(`X solved after col check? ${allXFlag}`);
        if(allXFlag) return this.isSolvedX = true;


        //diagonal check
        if ( row + col % 2 === 0) {
            

        }

    }

    toggleO(row, col) {
        this.board[row][col] = 2;
        let allOFlag = true;

        // **** CHECK IF ISSOLVED for Os
        if (row === col) {    // We are on a diagonal square, so check the diagonals. IE{(0,0), (1,1), (2,2)}
            // We know the current square at (row,col) is an O, so check either Up Diag or Down Diag
            // Hard coding this for 3x3 grid (classical) for now to test.
            for (var x = 0; x < this.height; x++) {
                if (!this.isO(x, x)) {
                    allOFlag = false;
                    break;
                };
                console.log(`seeing O piece at ${row} and ${x}`);
            }
        }

        // We are not on a diagonal so check current row or column. Ex: If row = 2, check that entire row

        for (var x = 0; x < this.width; x++) {
            if (!this.isO(x, x)) {
                allOFlag = false;
                break;
            };
            console.log(`seeing O piece at ${row} and ${x}`);

        }

        //Now check the column.
        for (var x = 0; x < this.height; x++) {
            if (!this.isO(x, x)) {
                allOFlag = false;
                break;
            };
            console.log(`seeing O piece at ${row} and ${x}`);

        }

        if (allOFlag = true) {
            this.isSolvedO = true; //This column is filled with all X's.
        }

    }

    clear() {
        this.board = new Array(
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]);
    }
}



module.exports = { Board };