import React from "react";

import classes from "./NavigationItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigationItem = (props) => (
	<li onClick={() => props.click()} className={classes.NavigationItem}>
		<a>
			<FontAwesomeIcon icon={props.icon} className="mr-2" />
			{props.children}
		</a>
	</li>
);

export default navigationItem;
