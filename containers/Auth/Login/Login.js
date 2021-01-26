import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import classes from "./Login.module.css";

import axios from "../../../axios";
import { wrapper } from "../../../redux";
import { connect } from "react-redux";
import {
	authenticate,
	checkServerSideCookie,
} from "../../../redux/actions/auth";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import { isEmail, isValidPassword } from "../../../shared/formValidation";

const Login = ({ authenticate, token, error}) => {

	

	const [formValid, setFormValid] = useState(false);

	const [state, setState] = useState({
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
				validation: (value) => {
					return value.length > 0;
				},
			},
		},
	});

	const loginSubmitHandler = async (e) => {
		e.preventDefault();

		if (formValid) {
			const email = state.controls["email"].attributes.value;
			const password = state.controls["password"].attributes.value;

			authenticate({ email, password });
		}
	};

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

	const checkIsFormValid = () => {
		let controlsState = { ...state.controls };

		let formValid = true;
		Object.keys(controlsState).forEach((key) => {
			let valid = controlsState[key].valid;

			formValid = valid && formValid;
		});

		console.log(formValid);

		setFormValid(formValid);
	};

	return (
		<form className={classes.Login} onSubmit={loginSubmitHandler}>
			<h2>Login</h2>
			<p>Please fill in your login details.</p>
			{error}
			{Object.keys(state.controls).map((controlKey) => {
				const control = state.controls[controlKey];

				return (
					<Input
						attributes={control.attributes}
						key={controlKey}
						valid={control.valid}
						touched={control.touched}
						options={control.options}
						defaultOption={control.defaultOption}
						changed={(event) => formInputChangedHandler(event)}
					/>
				);
			})}

			<Button
				icon={faUser}
				disabled={!formValid}
				clicked={loginSubmitHandler}
			>
				LOGIN
			</Button>
		</form>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		checkServerSideCookie(context);

		const currentState = context.store.getState();

		const token = currentState.token;
		const error = currentState.error;

		return {
			props: {
				token,
				error
			},
		};
	}
);

const  mapStateToPros = (state) => {
	return {
		error: state.error
	}
}

export default connect(mapStateToPros, { authenticate })(Login);