import Link from "next/link";

//Home Page in JSX (React allows you to code HTML directly in javascript)

export default function Home() {
	return (
		<div className="h-full">
			<div className="font-bold flex justify-center items-center">
				<h1 className="text-6xl">Welcome</h1>
			</div>
			<div className="hero h-80">
					<Link href="/games/tic-tac-toe/local">
						<button className="btn btn-primary w-1/6 h-1/2 rounded-full">Click here to play tic-tac-toe</button>
					</Link>
			</div>
		</div>
	);
}
