import '../styles/globals.css'
import { TTTContext, TTTWrapper } from '../contexts/TTTContext';

function MyApp({ Component, pageProps }) {
  return (
 

    <TTTWrapper>
      <Component {...pageProps} />
    </TTTWrapper>

  
  )
}

export default MyApp
