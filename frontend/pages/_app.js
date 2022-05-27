import "../styles/globals.css";
import { TTTContext, TTTWrapper } from "../contexts/TTTContext";
import { AuthWrapper } from "../contexts/AuthContext";
import { Layout } from "../components/Layout";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
	return (
		<>
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
