const { Board } = require("./Board.js");

const game1 = new Board();
const emptyGameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

test("board state check for new game", () => {
	for (let i = 0; i < 9; i++) {
		expect(game1.board[i]).toBe(emptyGameArr[i]);
	}
});

test("isX after toggle check", () => {
    game1.toggleX(1);
    expect(game1.isX(1)).toBe(true);
});

test("isO after toggle check", () => {
    game1.toggleO(2);
    expect(game1.isO(2)).toBe(true);
})

const newGameState = [0,1,2,0,0,0,0,0,0];

test("board state after toggle checks", () => {
    for (let i = 0; i < 9; i++) {
		expect(game1.board[i]).toBe(newGameState[i]);
	}
});

test("cleared state is a new game", () => {
    game1.clear();
    for (let i = 0; i < 9; i++) {
		expect(game1.board[i]).toBe(emptyGameArr[i]);
	};
    expect(game1.isSolvedX).toBe(false);
});

test("horizontal X victory", () => {
    game1.clear();
    game1.toggleX(3);
    game1.toggleX(4);
    game1.toggleX(5);

    expect(game1.isSolvedX).toBe(true);
});

test("vertical X victory", () => {
    game1.clear();
    game1.toggleX(2);
    game1.toggleX(5);
    game1.toggleX(8);

    expect(game1.isSolvedX).toBe(true);
});

test("diag X victory from 0-->8", () => {
    game1.clear();
    game1.toggleX(0);
    game1.toggleX(4);
    game1.toggleX(8);
    expect(game1.isSolvedX).toBe(true);
});

test("diag X victory from 2-->6", () => {
    game1.clear();
    game1.toggleX(2);
    game1.toggleX(4);
    game1.toggleX(6);
    expect(game1.isSolvedX).toBe(true);
});

// O Tests begin

test("horizontal O victory", () => {
    game1.clear();
    game1.toggleO(3);
    game1.toggleO(4);
    game1.toggleO(5);

    expect(game1.isSolvedO).toBe(true);
});

test("vertical O victory", () => {
    game1.clear();
    game1.toggleO(2);
    game1.toggleO(5);
    game1.toggleO(8);

    expect(game1.isSolvedO).toBe(true);
});

test("diag O victory from 0-->8", () => {
    game1.clear();
    game1.toggleO(0);
    game1.toggleO(4);
    game1.toggleO(8);
    expect(game1.isSolvedO).toBe(true);
});

test("diag O victory from 2-->6", () => {
    game1.clear();
    game1.toggleO(2);
    game1.toggleO(4);
    game1.toggleO(6);
    expect(game1.isSolvedO).toBe(true);
});

test("Not overriding game piece placement", () => {
    game1.clear();
    game1.toggleX(3);
    game1.toggleO(3);
    expect(game1.isX(3)).toBe(true);
})

test




