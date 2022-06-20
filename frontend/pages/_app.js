import "../styles/globals.css";
import Head  from "next/head";
import { TTTContext, TTTWrapper } from "../contexts/TTTContext";
import { AuthWrapper } from "../contexts/AuthContext";
import { Layout } from "../components/Layout";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Tic Tac Zachy</title>
				<link rel="icon" href="/grid-svgrepo-com.svg" />
			</Head>
			<AuthWrapper>
				<Layout>
					<TTTWrapper>
						<Component {...pageProps} />
					</TTTWrapper>
				</Layout>
			</AuthWrapper>
		</>
	);
}

export default MyApp;
