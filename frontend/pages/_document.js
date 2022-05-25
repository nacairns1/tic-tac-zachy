import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const setInitialTheme =`
  function getUserPreference() {
    if(window.localStorage.getItem('theme')) {
      return window.localStorage.getItem('theme')
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
  }
  document.body.dataset.theme = getUserPreference();
`
	return (	
			<Html data-theme={"night"}>
				<Head />
				<body>
					<Main />
          <script dangerouslySetInnerHTML={{__html: setInitialTheme}}/>
					<NextScript />
				</body>
			</Html>
	);
}
