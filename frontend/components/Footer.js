const Footer = () => {
	return (
		<footer className="footer footer-center h-24 absolute bottom-0 bg-base-300 text-base-content p-5">
			<div className="flex flex-row md:place-self-end">
				<div className="flex flex-col">
					<h2 className="text-base footer-title">Noah C</h2>
					<ul>
						<li className="link link-hover">Noah C GitHub</li>
					</ul>
				</div>
				<div className="divider divider-horizontal"></div>
				<div className="flex flex-col">
					<h2 className="text-base footer-title">Zach C</h2>
					<ul>
						<li className="link link-hover">Zach C GitHub</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

module.exports = { Footer };
