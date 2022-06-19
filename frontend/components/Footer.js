import Link from "next/link";

const Footer = () => {
	return (
		<footer className="footer footer-center h-24 absolute bottom-0 bg-base-300 text-base-content p-5">
			<div className="flex flex-row md:place-self-end">
				<div className="flex flex-col">
					<h2 className="text-base footer-title">Check Out the Project</h2>
					<ul>
						<Link href="https://github.com/nacairns1/tic-tac-zachy" target={"_blank"}>
							<li className="link link-hover">GitHub</li>
						</Link>
					</ul>
				</div>
			</div>
		</footer>
	);
};

module.exports = { Footer };
