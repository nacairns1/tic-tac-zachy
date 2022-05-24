import '../styles/globals.css'
import { TTTContext, TTTWrapper } from '../contexts/TTTContext';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  return (

    <>
    <NavBar/>
    <TTTWrapper>
      <Component {...pageProps} />
    </TTTWrapper>
    </>
  
  )
}

export default MyApp
