import React, { useState, useRef, useEffect } from "react";
import classes from "./FileUpload.module.css";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const fileUpload = (props) => {
	const inputFile = useRef(null);

	const [fileData, setFileData] = useState(null);

	const [fileBlob, setFileBlob] = useState(null);

	const [fileValid, setFileValid] = useState(false);

	useEffect(() => {
		if (fileData) {

			if (
				!["image/jpeg", "image/png", "image/gif"].includes(
					fileData.type
				)
			) {
				setFileData(null);
				setFileBlob(null);

				alert("Invalid file type.");
				return;
			}

			const objectURL = URL.createObjectURL(fileData);
			var img = new Image();

			img.onload = function () {
				const imgWidth = img.width;
				const imgHeight = img.height;

				if (imgWidth !== 468 && imgHeight !== 60) {
					setFileData(null);
					setFileBlob(null);

					alert("Banner file must be 468x60 pixels");
				}

				var reader = new FileReader();

				reader.readAsBinaryString(fileData);

				reader.onload = function () {
					props.changed(btoa(reader.result));
				};
				reader.onerror = function () {
					console.log("there are some problems");
				};
			};

			img.src = objectURL;
			setFileBlob(objectURL);
		}
	}, [fileData]);


    useEffect(() => {
        console.log("Value: ", props.value);
    }, props.value);

	const selectFilterHandlerDialog = (e) => {
		e.preventDefault();

		inputFile.current.click();
	};

	const fileSelectedHandler = (e) => {
		const fileData = e.target.files[0];

		setFileData(fileData);
	};

	return (
		<React.Fragment>
			<img className={classes.Image} src={fileBlob ? fileBlob : null} width="100%" />
			<br />

			<div className={classes.FileUpload}>
				<input
					className={classes.Input}
					type="text"
					value={fileData ? fileData.name : ""}
					onChange={() => {}}
					disabled
				/>

				<Button
					icon={faFolderOpen}
					clicked={selectFilterHandlerDialog}
				/>

				<input
					type="file"
					id="file"
					ref={inputFile}
					style={{ display: "none" }}
					onChange={fileSelectedHandler}
				/>
			</div>
		</React.Fragment>
	);
};

export default fileUpload;
