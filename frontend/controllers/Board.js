// Board represented by 2D array.
// Each cell in board is represented by a number.
// 0 = Empty
// 1 = Cell is an "X"
// 2 = Cell is an "O" as in Oscar

// **This prototype does not do any parameter checking.

class Board {
	constructor() {
		this.height = 3;
		this.width = 3;
		this.isSolvedX = false;
		this.isSolvedO = false;
		this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	isEmpty(boardSquareInd) {
		if (this.board[boardSquareInd] === 0) {
			return true;
		}
		return false;
	}

	isX(boardSquareInd) {
		return this.board[boardSquareInd] === 1;
	}

	isO(boardSquareInd) {
		return this.board[boardSquareInd] === 2;
	}

	toggleEmpty(boardSquareInd) {
		this.board[boardSquareInd] = 0;
	}

	rowValuesToCheck(boardSquareInd) {
		if (boardSquareInd < 3) {
			return [0, 1, 2];
		} else if (boardSquareInd < 6) {
			return [3, 4, 5];
		}
		return [6, 7, 8];
	}

	colValuesToCheck(boardSquareInd) {
		const col1 = [0, 3, 6];
		const col2 = [1, 4, 7];
		const col3 = [2, 5, 8];

		if (col1.includes(boardSquareInd)) {
			return col1;
		}
		if (col2.includes(boardSquareInd)) {
			return col2;
		}
		if (col3.includes(boardSquareInd)) {
			return col3;
		}
	}

	diagDownValuesToCheck(boardSquareInd) {
		const diagDown = [0, 4, 8];
		if (diagDown.includes(boardSquareInd)) return diagDown;
		return false;
	}

	diagUpValuesToCheck(boardSquareInd) {
		const diagUp = [6, 4, 2];
		if (diagUp.includes(boardSquareInd)) return diagUp;
		return false;
	}

	toggleX(boardSquareInd) {
        if (!this.isEmpty(boardSquareInd)) return;
		this.board[boardSquareInd] = 1;
		let allXFlag = false;

		//check row for all X's
		const rowValues = this.rowValuesToCheck(boardSquareInd);
		for (let i = 0; i < 3; i++) {
			if (!this.isX(rowValues[i])) {
				allXFlag = false;
				break;
			}
			allXFlag = true;
		}
		if (allXFlag) return (this.isSolvedX = true);

		//Now check the column.
		const colValues = this.colValuesToCheck(boardSquareInd);
		for (let i = 0; i < this.height; i++) {
			if (!this.isX(colValues[i])) {
				allXFlag = false;
				break;
			}
			allXFlag = true;
		}
		if (allXFlag) return (this.isSolvedX = true);

		//diagonal from index 0 --> 8 check conditionally
		//helper function returns false if not in the correct diagonal
		const diagDownValues = this.diagDownValuesToCheck(boardSquareInd);
		if (diagDownValues) {
			for (let i = 0; i < 3; i++) {
				if (!this.isX(diagDownValues[i])) {
					allXFlag = false;
					break;
				}
				allXFlag = true;
			}

			if (allXFlag) return (this.isSolvedX = true);
		}

		//repeat process for second diagonal
		const diagUpValues = this.diagUpValuesToCheck(boardSquareInd);
		if (diagUpValues) {
			for (let i = 0; i < 3; i++) {
				if (!this.isX(diagUpValues[i])) {
					allXFlag = false;
					break;
				}
				allXFlag = true;
			}
			if (allXFlag) return (this.isSolvedX = true);
		}
	}

	toggleO(boardSquareInd) {
        if (!this.isEmpty(boardSquareInd)) return;
		this.board[boardSquareInd] = 2;
		let allOFlag = false;

		//check row for all X's
		const rowValues = this.rowValuesToCheck(boardSquareInd);
		for (let i = 0; i < 3; i++) {
			if (!this.isO(rowValues[i])) {
				allOFlag = false;
				break;
			}
			allOFlag = true;
		}
		if (allOFlag) return (this.isSolvedO = true);

		//Now check the column.
		const colValues = this.colValuesToCheck(boardSquareInd);
		for (let i = 0; i < this.height; i++) {
			if (!this.isO(colValues[i])) {
				allOFlag = false;
				break;
			}
			allOFlag = true;
		}
		if (allOFlag) return (this.isSolvedO = true);

		//diagonal from index 0 --> 8 check conditionally
		//helper function returns false if not in the correct diagonal
		const diagDownValues = this.diagDownValuesToCheck(boardSquareInd);
		if (diagDownValues) {
			for (let i = 0; i < 3; i++) {
				if (!this.isO(diagDownValues[i])) {
					allOFlag = false;
					break;
				}
				allOFlag = true;
			}

			if (allOFlag) return (this.isSolvedO = true);
		}

		//repeat process for second diagonal
		const diagUpValues = this.diagUpValuesToCheck(boardSquareInd);
		if (diagUpValues) {
			for (let i = 0; i < 3; i++) {
				if (!this.isO(diagUpValues[i])) {
					allOFlag = false;
					break;
				}
				allOFlag = true;
			}
			if (allOFlag) return (this.isSolvedO = true);
		}
	}

	clear() {
        this.isSolvedX = false;
        this.isSolvedO = false;
		this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}
}

module.exports = { Board };
