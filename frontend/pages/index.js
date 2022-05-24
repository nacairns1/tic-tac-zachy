import Link from "next/link";

//Home Page in JSX (React allows you to code HTML directly in javascript)

export default function Home() {
	return (
		<>
			<div className="font-bold flex justify-center items-center">
				<h1 className="text-6xl">Welcome</h1>
			</div>
			<div className="flex justify-center w-10/12 mx-auto">
				<div className="bg-slate-900 flex justify-center items-center text-center w-1/4 h-full">
					<Link href="/games/tic-tac-toe">
						<a>Click here to play tic-tac-toe</a>
					</Link>
				</div>
        <div className="divider divider-vertical">OR</div>
        <div className="bg-slate-900 flex justify-center items-center text-center w-1/4 h-full">
					<Link href="/games/tic-tac-toe">
						<a>Click here to play tic-tac-toe</a>
					</Link>
				</div>
        <div className="divider divider-vertical">OR</div>
        <div className="bg-slate-900 flex justify-center items-center text-center w-1/4 h-full">
					<Link href="/games/tic-tac-toe">
						<a>Click here to play tic-tac-toe</a>
					</Link>
				</div>
			</div>
		</>
	);
}
