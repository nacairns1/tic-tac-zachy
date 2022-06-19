import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import Router from "next/router";
import { useFormik } from "formik";
import axios from "axios";

const validate = (values) => {
	const errors = {};
	if (!values.username) {
		errors.username = "Required";
	}
	if (!values.chosenPlayerPiece) {
		errors.chosenPlayerPiece = "Required";
	}

	return errors;
};

function GameBuilderForm(props) {
	const [player1, setPlayer1] = useState("");

	const [chosenPlayerPiece, setChosenPlayerPiece] = useState("X");
	const [playerCreateError, setPlayerCreateError] = useState(false);
	const [loadingRandomGame, setLoadingRandomGame] = useState(false);
	const [xClassState, setXClassState] = useState("btn btn-primary btn-info");
	const [oClassState, setOClassState] = useState("btn btn-primary btn-error");


	useEffect(() => {
		async function checkQueue() {
			console.log('checking queue...');
			let httpMessageConfig = httpMessageConfig = {
				method: "post",
				url: "http://localhost:5000/tic-tac-toe/new_game/queue_status",
				data: {
					username: localStorage.getItem("CURRENT_USER")
				},
			};

			const newGameRes = await axios(httpMessageConfig);

			if (newGameRes.data.gameId != null) {
				Router.push(`/games/tic-tac-toe/${newGameRes.data.gameId}`)
			}
		}
		let interval;
		if (loadingRandomGame) {
			interval = setInterval(()=> {checkQueue()}, 2000);
		}
		return () => {clearInterval(interval)}
	}, [loadingRandomGame])

	useEffect(() => {
		let local_player = localStorage.getItem("CURRENT_USER");
		if (local_player === null) {
			Router.push("../../users/login");
		} else {
			setPlayer1(local_player);
		}
	}, []);

	const createNewGameRequest = useCallback(
		async (data) => {
			const httpMessageConfig = {
				method: "post",
				url: "http://localhost:5000/tic-tac-toe/new_game/invite",
				data: {
					player_x: chosenPlayerPiece === "X" ? localStorage.getItem("CURRENT_USER") : data.username,
					player_o: chosenPlayerPiece === "O" ? localStorage.getItem("CURRENT_USER") : data.username,
				},
			};
			try {
				const res = await axios(httpMessageConfig);
				Router.push(`./${res.data.game.id}`);
			} catch (e) {
				console.error(e);
			}
		},
		[chosenPlayerPiece]
	);

	const formik = useFormik(
		{
			initialValues: { username: "", chosenPlayerPiece: "X" },
			validate: validate,
			onSubmit: createNewGameRequest,
		},
		[chosenPlayerPiece]
	);

	return (
		<div className=" mx-20 my-20 flex justify-center items-center gap-5">
			<form
				className="form-control px-10 py-10 bg-base-300 w-5/6 h-5/6 gap-5"
				onSubmit={formik.handleSubmit}
			>
				<label className="label">
					<span className="label-text text-3xl font-bold">
						Invite Another User!
					</span>
				</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					className="input input-bordered input-primary w-full max-w-xl"
					value={formik.values.username}
					onChange={formik.handleChange}
				></input>
				<h4 className="text-3xl font-bold">Choose your piece!</h4>
				<div className="max-w-xl flex gap-8 justify-center">
					<button
						type="button"
						className={`${xClassState} btn-lg`}
						name="x-player-piece"
						onChange={formik.handleChange}
						onClick={() => {
							setOClassState("btn btn-ghost");
							setXClassState("btn btn-primary btn-info");
							setChosenPlayerPiece("X");
							formik.setFieldValue("chosenPlayerPiece", "X");
						}}
					>
						X
					</button>
					<button
						type="button"
						className={`${oClassState} btn-lg`}
						onChange={formik.handleChange}
						name="o-player-piece"
						onClick={() => {
							setXClassState("btn btn-ghost");
							setOClassState("btn btn-primary btn-error");
							formik.setFieldValue("chosenPlayerPiece", "O");
							setChosenPlayerPiece("O");
						}}
					>
						O
					</button>
				</div>

				<button type="submit" className="btn btn-accent btn-md max-w-xl">
					Start New Game!
				</button>
			</form>
			{!loadingRandomGame ? (
				<button
					className="btn btn-large btn-secondary"
					onClick={async () => {
						
						const httpMessageConfig = {
							method: "post",
							url: "http://localhost:5000/tic-tac-toe/new_game/random_user",
							data: {
								username: localStorage.getItem("CURRENT_USER") 
							},
						};
						try {
							let newGameRes = await axios(httpMessageConfig);
							newGameRes.data
							if (newGameRes.data.gameId != null) {
								Router.push(`/games/tic-tac-toe/${newGameRes.data.gameId}`)
							} else {
								console.log('no other players in queue. entering queue...');
								setLoadingRandomGame(true);
							}
						} catch (e) {}
					}}
				>
					Play against a random opponent!
				</button>
			) : (
				<button
					className="btn btn-large btn-warning"
					onClick={async () => {
						const httpMessageConfig = {
							method: "post",
							url: "http://localhost:5000/tic-tac-toe/new_game/leave_queue",
							data: {
								username: localStorage.getItem("CURRENT_USER")
							},
						};
						let res = await axios(httpMessageConfig);
						setLoadingRandomGame(false);
					}}
				>
					Loading into game. Click to cancel...
				</button>
			)}
		</div>
	);
}

module.exports = { GameBuilderForm };
