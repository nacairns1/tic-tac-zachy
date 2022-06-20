import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { Head } from "next/document";

const Layout = ({ props, children }) => {
	return (
		<div className="relative min-h-screen">

			<div className="pb-[4.75rem]">
				<NavBar />

				{children}

				<Footer />
			</div>
		</div>
	);
};

module.exports = { Layout };
