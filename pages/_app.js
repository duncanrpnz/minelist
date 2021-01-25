import "../styles/globals.css";
import React, { useEffect } from "react";

import { wrapper } from "../redux";


function MyApp({ Component, pageProps }) {
	console.log(pageProps);

	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
