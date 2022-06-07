import { useState, Fragment } from "react";
import { Dialog } from "@headlessui/react";
import Router from "next/router";

function GameBuilderForm(props) {
	const [xClassState, setXClassState] = useState("btn btn-primary btn-info");
	const [oClassState, setOClassState] = useState("btn btn-primary btn-error");

	return (
		<div className=" mx-20 my-20 flex justify-center">
			<form
				className="form-control px-10 py-10 bg-base-300 w-5/6 h-5/6 gap-5"
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<label className="label">
					<span className="label-text text-3xl font-bold">
						Invite Another User!
					</span>
				</label>
				<input
					type="text"
					placeholder="Username"
					className="input input-bordered input-primary w-full max-w-xl"
				></input>
				<h4 className="text-3xl font-bold">Choose your piece!</h4>
				<div className="max-w-xl flex gap-8 justify-center">
					<button
						className={`${xClassState} btn-lg`}
						onClick={() => {
							setOClassState("btn btn-ghost");
							setXClassState("btn btn-primary btn-info");
						}}
					>
						X
					</button>
					<button
						className={`${oClassState} btn-lg`}
						onClick={() => {
							setXClassState("btn btn-ghost");
							setOClassState("btn btn-primary btn-error");
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
