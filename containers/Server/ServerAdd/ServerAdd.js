import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";

import classes from "./ServerAdd.module.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { faPlusSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import Countries from "../../../shared/countries";
import axios from "../../../axios";
import LoadingIndicator from "../../../components/UI/LoadingIndicator/LoadingIndicator";

const serverAdd = (props) => {
	const formRef = useRef(null);

	const [formValid, setFormValid] = useState(false);

	const [formFileData, setFormFileData] = useState(null);

	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState(null);

	useEffect(() => {
		if (props.id) {
			setLoading(true);

			//Lookup existing stuffs
			axios.get(`/servers/${props.id}`).then((result) => {
				const data = result.data[0];

				const controls = { ...state.controls };

				controls.name.attributes.value = data.name ?? "";
				controls.host.attributes.value = data.ip ?? "";
				controls.port.attributes.value = data.port ?? "25565";
				controls.description.attributes.value = data.description ?? "";
				controls.website.attributes.value = data.social_website ?? "";
				controls.discord.attributes.value = data.social_discord ?? "";
				controls.country.attributes.value = data.country;
				controls.file.attributes.value = data.banner;

				setState({
					...state,
					controls: controls,
				});

				setLoading(false);
			});
		}
	}, [props.id]);

	const [state, setState] = useState({
		controls: {
			name: {
				attributes: {
					label: "Server Name",
					id: "name",
					name: "name",
					value: "1",
					type: "name",
					placeholder: "The name of your server",
				},
				valid: true,
				touched: true,
				validation: (text) => text.length > 0,
			},
			host: {
				attributes: {
					label: "Server IP / Host name",
					id: "host",
					name: "host",
					value: "1",
					type: "host",
					placeholder: "e.g. myserver.myhost.com",
				},
				valid: true,
				touched: true,
				validation: (value) => value.length > 0,
			},
			port: {
				attributes: {
					label: "Server Port",
					id: "port",
					name: "port",
					value: "25565",
					type: "port",
					placeholder: "Default: 25565",
				},
				valid: true,
				touched: true,
				validation: (value) => value.length > 0 && !isNaN(value),
			},
			description: {
				attributes: {
					label: "Description",
					id: "description",
					name: "description",
					value: "",
					type: "textarea",
					placeholder: "Describe your server",
				},
				valid: true,
				touched: true,
				validation: (value) => value.length > 100,
			},
			website: {
				attributes: {
					label: "Website",
					id: "website",
					name: "website",
					value: "test.com",
					type: "website",
					placeholder: "",
				},
				valid: true,
				touched: true,
			},
			discord: {
				attributes: {
					label: "Discord",
					id: "discord",
					name: "discord",
					value: "gg.com",
					type: "discord",
					placeholder: "",
				},
				valid: true,
				touched: true,
			},
			country: {
				attributes: {
					label: "Country",
					id: "country",
					name: "country",
					checked: false,
					type: "select",
				},
				options: Countries,
				defaultOption: "New Zealand",
				valid: true,
				touched: true,
				validation: (value) => value !== "Please select your country",
			},
			file: {
				attributes: {
					label: "Banner (Resolution: 468x60)",
					id: "file",
					name: "file",
					checked: false,
					type: "fileUpload",
				},
				valid: false,
				touched: false,
			},
		},
	});

	const formInputChangedHandler = (e) => {
		const element = e.target.id;
		const elementVal = e.target.value;

		let controlsState = { ...state.controls };

		let control = controlsState[element];

		control.touched = true;
		control.attributes.value = elementVal;

		if (control.validation) {
			control.valid = control.validation(elementVal);
		}

		checkIsFormValid();

		setState({
			...state,
			controls: controlsState,
		});
	};

	const formFileSetHandler = (fileData) => {
		const controlsState = { ...state.controls };
		controlsState.file.attributes.value = fileData;

		setFormFileData(fileData);

		setState({
			...state,
			controls: controlsState,
		});
	};

	const checkIsFormValid = () => {
		let controlsState = { ...state.controls };

		let formValid = true;
		Object.keys(controlsState).forEach((key) => {
			let valid = controlsState[key].valid;

			if (controlsState[key].validation) {
				formValid = valid && formValid;
			}
		});

		formValid = formValid;

		setFormValid(formValid);
	};

	const addServerHandler = (e) => {
		e.preventDefault();

		setLoading(true);

		const data = {};

		Object.keys(state.controls).map((key) => {
			data[key] = state.controls[key].attributes.value;
		});

		if (!props.id) {
			axios
				.post("/servers", data)
				.then((response) => {
					if (response.data.code === 201) {
						props.router.replace("/");
					}

					if (response.data.code === 400) {
						setLoading(false);
						setErrors(response.data.errors);
					}
				})
				.catch((error) => {
					setLoading(false);
					setErrors(["An error occured while adding server"]);
				});
		} else {
			axios
				.put(`/servers/${props.id}`, data)
				.then((response) => {
					console.log(response);
					if (response.data.code === 201) {
						props.router.replace("/server/manage");
					}

					if (response.data.code === 400) {
						setLoading(false);
						setErrors(response.data.errors);
					}
				})
				.catch((error) => {
					setLoading(false);
					setErrors(["An error occured while adding server"]);
				});
		}
	};

	let formClasses = [];

	if (loading) {
		formClasses = ["d-none"];
	}

	return (
		<form
			className={classes.ServerAdd}
			ref={formRef}
			encType="multipart/form-data"
		>
			{loading && <LoadingIndicator />}

			<div className={formClasses.join(" ")}>
				<h2>Add Your Server</h2>
				<p>
					Please fill in all required details in order to post your
					server.
				</p>

				{errors && <p className="red">{errors.join("<br/>")}</p>}
				{Object.keys(state.controls).map((controlKey) => {
					const control = state.controls[controlKey];

					let controlChangedEvent = (event) =>
						formInputChangedHandler(event);

					if (control.attributes.type === "fileUpload") {
						controlChangedEvent = (fileData) =>
							formFileSetHandler(fileData);
					}

					return (
						<Input
							attributes={control.attributes}
							key={controlKey}
							valid={control.validation ? control.valid : true}
							touched={control.touched}
							options={control.options}
							defaultOption={control.defaultOption}
							changed={controlChangedEvent}
						/>
					);
				})}

				<Button
					icon={faPlusSquare}
					disabled={!formValid}
					clicked={addServerHandler}
				>
					ADD
				</Button>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.token,
	};
};

export default connect(mapStateToProps)(withRouter(serverAdd));
