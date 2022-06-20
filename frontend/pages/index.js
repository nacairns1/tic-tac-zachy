import Link from "next/link";
import Head from 'next/head';

//Home Page in JSX (React allows you to code HTML directly in javascript)

export default function Home() {
	return (
		<div className="h-full">
			<div className="font-bold flex justify-center items-center">
				<h1 className="text-6xl py-10">Welcome!</h1>
			</div>
			<div className="h-80 flex flex-col md:flex-row justify-center items-center gap-10">
				<Link href="/games/tic-tac-toe/local">
					<button className="btn btn-primary btn-xl h-1/2 rounded-3xl">
						Play Tic-Tac-Toe Offline!
					</button>
				</Link>
				<Link href="/games/tic-tac-toe/new-game">
					<button className="btn btn-secondary btn-xl h-1/2 rounded-3xl">
						Play Tic-Tac-Toe Online!
					</button>
				</Link>
			</div>
		</div>
	);
}
