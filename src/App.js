import logo from './logo.svg';
import './App.css';
import { OreId } from "oreid-js"
import { OreidProvider, useIsLoggedIn } from "oreid-react"
import React, {useState, useEffect } from "react"
import { WebPopup } from "oreid-webpopup"

const oreId = new OreId({
  appName: "Polygon ORE-ID Sample App",
  appId: process.env.REACT_APP_OREID_APP_ID,
  oreIdUrl: "https://dev.service.oreid.io",
  plugins: {
    popup: WebPopup(),
  },
});

const AppWithProvider = () => {
	// const isLoggedIn = useIsLoggedIn();
	return (
		<div className="App">
			{/* {isLoggedIn ? "Hello" : "Logged Out"} */}
      Hello!
		</div>
	);
};

export const App = () => {
	const [oreidReady, setOreidReady] = useState(false);

	useEffect(() => {
		oreId.init().then(() => {
			setOreidReady(true);
      console.log("OREID is connected")
		});
	}, []);

	if (!oreidReady) {
		return <>Loading...</>;
	}

	return (
		<OreidProvider oreId={oreId}>
			<AppWithProvider />
		</OreidProvider>
	);
};

export default App
