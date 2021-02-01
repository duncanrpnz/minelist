import "../styles/globals.css";
import React, { useEffect, useState } from "react";

import { wrapper } from "../redux";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Head>
				<title>MineList - Your minecraft server list</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default wrapper.withRedux(MyApp);
