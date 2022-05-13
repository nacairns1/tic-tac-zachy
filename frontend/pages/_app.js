import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
  <header> Header Test</header>
  <Component {...pageProps} />
  <footer>Footer Test</footer>
  </>)
}

export default MyApp
