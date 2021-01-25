import React from "react";
import classes from "./Input.module.css";
import FileUpload from "../FileUpload/FileUpload";

const input = (props) => {
	console.log(props);
	
	let inputClasses = [classes.Input];

	if (!props.valid && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	if (props.valid && props.touched) {
		inputClasses.push(classes.Valid);
	}

	let input = (
		<input
			className={inputClasses.join(" ")}
			{...props.attributes}
			onChange={props.changed}
		/>
	);

	if (props.attributes.type === "select") {
		input = (
			<select
				className={inputClasses.join(" ")}
				{...props.attributes}
				onChange={props.changed}
			>
				<option value={null}>{props.defaultOption}</option>
				{props.options.map((option, i) => {
					let text = option;
					let value = option;

					if (typeof option == "object") {
						text = option.text;
						value = option.value;
					}

					return (
						<option key={i} value={value}>
							{text}
						</option>
					);
				})}
			</select>
		);
	}

	if (props.attributes.type === "fileUpload") {
		input = <FileUpload changed={props.changed} value={props.attributes.value} key="fileUpload" />;
	}

	return (
		<React.Fragment>
			{props.attributes.label && (
				<label key={props.attributes.label} className={classes.Label} htmlFor={props.id}>
					{props.attributes.label}
				</label>
			)}

			{input}
		</React.Fragment>
	);
};

export default input;
