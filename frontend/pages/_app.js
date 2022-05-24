import "../styles/globals.css";
import { TTTContext, TTTWrapper } from "../contexts/TTTContext";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Layout>
				<TTTWrapper>
					<Component {...pageProps} />
				</TTTWrapper>
			</Layout>
		</>
	);
}

export default MyApp;
