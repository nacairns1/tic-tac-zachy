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

                allXFlag = false;
                break;
            };
            allXFlag = true;
        }


        if (allXFlag) return this.isSolvedX = true;

        //Now check the column.
        for (let i = 0; i < this.height; i++) {
            if (!this.isX(i, col)) {

                allXFlag = false;
                break;
            };
            allXFlag = true;
        }

        if (allXFlag) return this.isSolvedX = true;


        //diagonal check

        if ((row + col) % 2 === 0) {

            for (let i = 0; i < 3; i++) {
                if (!this.isX(i, i)) {
                    allXFlag = false;
                    break;
                }
                allXFlag = true;
            }

            if (allXFlag) return this.isSolvedX = true;

            //check second diagonal
            for (let i = 0; i < 3; i++) {
                if (!this.isX(2 - i, i)) {
                    allXFlag = false;
                    break;
                }
                allXFlag = true;
            }


            if (allXFlag) return this.isSolvedX = true;
        }
    }

    toggleO(row, col) {
        this.board[row][col] = 2;
        let allOFlag = false;

        //check row for all O's
        for (let i = 0; i < this.width; i++) {
            if (!this.isO(row, i)) {

                allOFlag = false;
                break;
            };
            allOFlag = true;
        }


        if (allOFlag) return this.isSolvedO = true;

        //Now check the column.
        for (let i = 0; i < this.height; i++) {
            if (!this.isO(i, col)) {

                allOFlag = false;
                break;
            };
            allOFlag = true;
        }

        if (allOFlag) return this.isSolvedO = true;


        //diagonal check

        if ((row + col) % 2 === 0) {

            for (let i = 0; i < 3; i++) {
                if (!this.isO(i, i)) {
                    allOFlag = false;
                    break;
                }
                allOFlag = true;
            }

            if (allOFlag) return this.isSolvedO = true;

            //check second diagonal
            for (let i = 0; i < 3; i++) {
                if (!this.isO(2 - i, i)) {
                    allOFlag = false;
                    break;
                }
                allOFlag = true;
            }


            if (allOFlag) return this.isSolvedO = true;
        }
    }

    clear() {
        this.board = new Array
            (
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            );

    }
}



module.exports = { Board };