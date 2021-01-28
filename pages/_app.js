import "../styles/globals.css";
import React, { useEffect, useState } from "react";

import { wrapper } from "../redux";




function MyApp({ Component, pageProps }) {

	return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
