import { useState, Fragment } from "react";
import { Dialog } from "@headlessui/react";
import Router from "next/router";

function NewGameModal(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<div className="fixed inset-0 bg-black/30 flex justify-center items-center" />
			<Dialog.Panel className="fixed inset-56 flex flex-col items-center justify-center p-4 rounded-md">
				<div className="flex w-96 h-72 items-center justify-center flex-col bg-base-100">
					<Dialog.Title className={"text-2xl font-bold"}>
						New Game!
					</Dialog.Title>
					<div className="flex flex-row gap-5 py-10">
						<button
							className="btn btn-primary"
							onClick={() => {
								Router.push("/games/tic-tac-toe/local");
								props.onClose();
							}}
						>
							LOCAL
						</button>
						<button className="btn btn-secondary" onClick={() => {
								Router.push("/games/tic-tac-toe/new-game");
								props.onClose();
							}}>ONLINE</button>
					</div>
				</div>
			</Dialog.Panel>
		</Dialog>
	);
}

module.exports = { NewGameModal };
