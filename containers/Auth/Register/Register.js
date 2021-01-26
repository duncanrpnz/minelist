import React, { Component } from "react";

import classes from "./Register.module.css";

import axios from "../../../axios";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";
import { isEmail, isValidPassword } from "../../../shared/formValidation";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingIndicator from "../../../components/UI/LoadingIndicator/LoadingIndicator";

class Register extends Component {
	state = {
		formValid: false,
		recaptchaValue: null,
		loading: false,
		errors: null,
		controls: {
			email: {
				attributes: {
					label: "Email",
					id: "email",
					name: "email",
					value: "",
					type: "email",
					placeholder: "Email address",
				},
				valid: false,
				touched: false,
				validation: (value) => isEmail(value),
			},
			password: {
				attributes: {
					label: "Password",
					id: "password",
					name: "password",
					value: "",
					type: "password",
					placeholder: "Enter a password",
				},
				valid: false,
				touched: false,
				validation: (value) => isValidPassword(value),
			},
			passwordVerify: {
				attributes: {
					label: "Confirm Password",
					id: "passwordVerify",
					name: "passwordVerify",
					value: "",
					type: "password",
					placeholder: "Confirm your password",
				},
				valid: false,
				touched: false,
				validation: (value) => {
					return (
						value === this.state.controls.password.attributes.value
					);
				},
			},
			tosAgreement: {
				attributes: {
					label: (
						<p>
							I do agree to the <a href="">Terms of Service</a>
						</p>
					),
					id: "tosAgreement",
					name: "tosAgreement",
					checked: false,
					type: "select",
				},
				options: ["Yes", "No"],
				defaultOption: "Please select an answer",
				valid: false,
				touched: false,
				validation: (value) => {
					let resolved = value === "Yes";

					if (!resolved) {
						alert(
							"You must agree to the Terms of Service to continue."
						);
					}

					return resolved;
				},
			},
		},
	};

	registerSubmitHandler = (e) => {
		e.preventDefault();

		if (this.state.formValid) {
			this.setState({ loading: true });

			const data = {
				email: this.state.controls["email"].attributes.value,
				password: this.state.controls["password"].attributes.value,
				passwordVerify: this.state.controls["passwordVerify"].attributes
					.value,
				tosAgreement: this.state.controls["tosAgreement"].attributes
					.value,
				recaptcha: this.state.recaptchaValue,
			};

			axios
				.post("/auth/register", data)
				.then((response) => {
					if (response.data.code === 201) {
						this.props.router.replace("/auth/login");
					}

					if (response.data.code === 400) {
						console.log(response);
						this.setState({ errors: response.data.errors });
					}

					this.setState({ loading: false });
				})
				.catch((error) => {
					console.log(error);
					this.setState({ loading: true });
				});
		}
	};

	formInputChangedHandler = (e) => {
		const element = e.target.id;
		const elementVal = e.target.value;

		let controlsState = { ...this.state.controls };

		let control = controlsState[element];

		control.touched = true;
		control.attributes.value = elementVal;

		if (control.validation) {
			control.valid = control.validation(elementVal);
		}

		this.checkIsFormValid();

		this.setState({
			controls: controlsState,
		});
	};

	checkIsFormValid = () => {
		let controlsState = { ...this.state.controls };

		let formValid = true;
		Object.keys(controlsState).forEach((key) => {
			let valid = controlsState[key].valid;

			formValid = valid && formValid;
		});

		formValid = formValid && this.state.recaptchaValue;

		this.setState({
			formValid: formValid,
		});
	};

	onChange = (value) => {
		this.setState({
			recaptchaValue: value,
		});

		this.checkIsFormValid();
	};

	render() {
		return (
			<form
				className={classes.Register}
				onSubmit={this.registerSubmitHandler}
			>
				{this.state.loading ? (
					<LoadingIndicator />
				) : (
					<React.Fragment>
						<h2>Register</h2>
						<p>Please fill in the below registration details.</p>
						{this.state.errors && <div className="mb-3 text-danger">{this.state.errors.join(<br/>)}</div>}
						{Object.keys(this.state.controls).map((controlKey) => {
							const control = this.state.controls[controlKey];

							return (
								<Input
									attributes={control.attributes}
									key={controlKey}
									valid={control.valid}
									touched={control.touched}
									options={control.options}
									defaultOption={control.defaultOption}
									changed={(event) =>
										this.formInputChangedHandler(event)
									}
								/>
							);
						})}

						<div className={classes.Recaptcha}>
							<ReCAPTCHA
								sitekey="6LeDoi8aAAAAAHS4_4avtUFw1wIAwfwg6GbhGo-k"
								onChange={this.onChange}
							/>
						</div>
						<Button
							icon={faPaperPlane}
							disabled={!this.state.formValid}
						>
							SUBMIT{" "}
						</Button>
					</React.Fragment>
				)}
			</form>
		);
	}
}

export default Register;