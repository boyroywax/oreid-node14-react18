import { OreId } from "oreid-js"
import { OreidProvider, useIsLoggedIn } from "oreid-react"
import { WebPopup } from "oreid-webpopup"
import { useEffect, useState } from "react"

import { LoginPage } from "./LoginPage";

const oreId = new OreId({
    appName: "ORE-ID React Sample App",
    appId: process.env.REACT_APP_OREID_APP_ID,
    oreIdUrl: "https://service.oreid.io",
    plugins: {
        popup: WebPopup(),
    },
});

const LogoutUser = () => {
    return (
        <button
            onClick={() => {
                oreId.logout();
            }}
        >
            Logout
        </button>
    );
};

const AppWithProvider = () => {
	const isLoggedIn = useIsLoggedIn()
	return (
		<div>
			{/* The following if statement will display */}
			{/* the logged in status of the user. The login */}
            {/* page will be shown if the user is logged out. */}
            {isLoggedIn ? <LogoutUser /> : <LoginPage />}
		</div>
	);
};

export const App = () => {
const [oreidReady, setOreidReady] = useState(false);

	useEffect(() => {
        oreId.init()
            .then(() => {
                setOreidReady(true);
                console.log("OREID is connected");
            })
            .catch((error) => console.log(error));
	}, []);

    if (!oreidReady) {
        return <>Loading...</>;
    }

	return (
		<OreidProvider oreId={ oreId }>
			<AppWithProvider />
		</OreidProvider>
	);
};

export default App;