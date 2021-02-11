import "../styles/globals.css";
import React, { useEffect, useState } from "react";

import { wrapper } from "../redux";

import Head from "next/head";
import "../components/NavigationBar/NavigationBarTransition.css";
function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Head>
				<title>MineList - Your minecraft server list</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta name="description" content="Find the best Minecraft servers with our multiplayer server list. Browse detailed information on each server and vote for your favourite."/>
                <meta name="keywords" content="minecraft, minecraft servers, minecraft server list"/>
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default wrapper.withRedux(MyApp);
