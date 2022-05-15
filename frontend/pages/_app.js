import '../styles/globals.css'
import { TTTContext, TTTWrapper } from '../contexts/TTTContext';

function MyApp({ Component, pageProps }) {
  return (<>
    <header> Header Test</header>

    <TTTWrapper>
      <Component {...pageProps} />
    </TTTWrapper>

    <footer>Footer Test</footer>
  </>)
}

export default MyApp
