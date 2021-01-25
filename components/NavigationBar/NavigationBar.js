import React, { Component } from "react";
import classes from "./NavigationBar.module.css";

import NavigationItems from "./NavigationItems/NavigationItems";

import { Input, Form, FormControl, Button } from "react-bootstrap";

import { withRouter } from "next/router";

import {connect} from "react-redux";


import { deauthenticate } from "../../redux/actions/auth";

class NavigationBar extends Component {

	render() {

        const router = this.props.router;

		let buttons = (
			<React.Fragment>
				<Button
					onClick={() => router.push("/login")}
					className="mr-2"
					type="submit"
					variant="light"
				>
					Login
				</Button>
				<Button
					onClick={() => router.push("/register")}
					type="submit"
					variant="light"
				>
					Register
				</Button>
			</React.Fragment>
		);

        console.log(this.props.authenticated);

		if (this.props.authenticated) {
			buttons = (
				<React.Fragment>
					<Button
						onClick={() => router.push("/server/add")}
						className="mr-2"
						type="submit"
						variant="light"
					>
						Add Server
					</Button>
					<Button
						onClick={() => router.push("/logout")}
						type="submit"
						variant="light"
					>
						Logout
					</Button>
				</React.Fragment>
			);
		}

		return (
			<header
				className={["container-fluid", classes.NavigationBar].join(" ")}
			>
				<div className="container mx-auto h-100 d-flex">
					<div className="d-flex align-items-center">
						<h3 className="mb-0">MineList</h3>
					</div>

					<nav className="ml-4">
						<NavigationItems />
					</nav>

					<div className="ml-auto d-flex align-items-center">
						{/* <Button type="submit" variant='light'>Login</Button> */}
						{buttons}
						{/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button type="submit" variant='light'>Submit</Button>
                    </Form> */}
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(NavigationBar);
