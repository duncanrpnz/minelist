import React from "react";

import classes from "./NavigationItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigationItem = (props) => (
	<li  className={classes.NavigationItem}>
		<a href={props.href}>
			<FontAwesomeIcon icon={props.icon} className="mr-2" />
			{props.children}
		</a>
	</li>
);

export default navigationItem;
