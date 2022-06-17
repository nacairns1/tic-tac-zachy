import { useState, Fragment, useEffect, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import Router from "next/router";
import { useFormik } from "formik";
import axios from "axios";

const validate = (values) => {
	const errors = {};

	console.log(values);
	if (!values.username) {
		errors.username = "Required";
	} 
	if (!values.chosenPlayerPiece) {
		errors.chosenPlayerPiece = "Required";
	}

	return errors;
};

function GameBuilderForm(props) {
	const [player1, setPlayer1] = useState('');
	
	const [chosenPlayerPiece, setChosenPlayerPiece] = useState('X');
	const [xClassState, setXClassState] = useState("btn btn-primary btn-info");
	const [oClassState, setOClassState] = useState("btn btn-primary btn-error");

	useEffect(()=> {
		let local_player = localStorage.getItem("CURRENT_USER");
		if (local_player === null) {
			Router.push('../../users/login');
		} else {
			setPlayer1(local_player);
		}
	})

	const createNewGameRequest = useCallback(async (data) => {
		const httpMessageConfig = {
			method: "post",
			url: "http://localhost:5000/tic-tac-toe/new_game/invite",
			data: {
				player_x: chosenPlayerPiece === "X" ? player1 : data.username,
				player_o: chosenPlayerPiece === "O" ? player1 : data.username
			},

		};
		console.log(httpMessageConfig.data);
		try {
			const res = await axios(httpMessageConfig);
			console.log(res);
			Router.push(`./${res.data.game.id}`);
		} catch (e) {
			console.error(e);
		}
	}, [chosenPlayerPiece]);


	const formik = useFormik({
		initialValues: { username: "", chosenPlayerPiece: "X" },
		validate: validate,
		onSubmit: createNewGameRequest
	}, [chosenPlayerPiece]);



	return (
		<div className=" mx-20 my-20 flex justify-center">
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
						}
					}
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
		</div>
	);
}

module.exports = { GameBuilderForm };
