import "../styles/globals.css";
import React, { useEffect, useState } from "react";

import { wrapper } from "../redux";

function MyApp({ Component, pageProps }) {
	return (
		<html>
			<head>
				<title>Minelist - Your minecraft server list</title>

			</head>
			<Component {...pageProps} />
		</html>
	);
}

export default wrapper.withRedux(MyApp);
