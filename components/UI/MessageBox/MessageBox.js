import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faExclamation } from "@fortawesome/free-solid-svg-icons";

import classes from "./MessageBox.module.css";

const messageBox = (props) => {

	const type = classes[props.type] ?? classes.Danger;

	return (
		<div
			className={[classes.MessageBox, type]
				.concat(props.className)
				.join(" ")}
		>
			<span className={classes.Icon}>
				<FontAwesomeIcon icon={faExclamation} />
			</span>

			<span className={classes.Text}>{props.children}</span>
		</div>
	);
};

export default messageBox;
