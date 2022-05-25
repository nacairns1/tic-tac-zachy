const Footer = () => {
	return (
		<footer className="footer p-10 bg-base-300 text-base-content">
			<div>
				<h2>NCZC</h2>
			</div>
			<div>
				<span className="footer-title">Project</span>
				<a className="link link-hover">GitHub</a>
			</div>
			<div>
				<span className="footer-title">Creators</span>
				<div className="flex flex-row">
					<ul>
						<li className="link link-hover">Noah C Website</li>
						<li className="link link-hover">Noah C GitHub</li>
					</ul>
                    <div className="divider divider-horizontal"></div>
					<ul>
						<li className="link link-hover">Zach C Website</li>
						<li className="link link-hover">Zach C GitHub</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

module.exports = { Footer };
