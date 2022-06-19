import Link from 'next/link';

const renderGame = (gameState, id) => {
	let internalId = 0;
	return gameState.map((square) => {
		let translatedSquare;
		if (square === 1) {
			translatedSquare = "X";
		} else if (square === 2) {
			translatedSquare = "O";
		} else {
			translatedSquare = "";
		}
		return (
			<div
				key={`id-${id}-${internalId++}`}
				className="flex align-center justify-center text-center border"
			>
				<div className=" flex justify-center items-center w-5/6 font-bold no-animation">
					{translatedSquare}
				</div>
			</div>
		);
	});
};

const gamePreview = (props) => {
	const gameState = props.game.gameState;
	const id = props.game.id;
	let outerId = 0;
	const players = props.game.players;
	return (
		<Link href={`/games/tic-tac-toe/${id}`}>
			<div className="card w-1/4 bg-base-100 border" key={`${id}-${outerId++}`}>
				<div className="min-h-[10rem] grid grid-cols-3 grid-rows-3">
					{renderGame(gameState, id)}
				</div>
				<div className="card-body text-center font-bold">
					<p>
						{players[0].username} VS {players[1].username}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default gamePreview;
