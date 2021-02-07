import React, { Component } from "react";
import classes from "./NavigationBar.module.css";

import NavigationItems from "./NavigationItems/NavigationItems";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";

import { Input, Form, FormControl, Button } from "react-bootstrap";

import { withRouter } from "next/router";

import { connect } from "react-redux";

import { deauthenticate } from "../../redux/actions/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt, faSignInAlt, faEdit, faPlus, faHome, faStar, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

class NavigationBar extends Component {
	render() {
		const router = this.props.router;

		return (
			<header
				className={["container-fluid", classes.NavigationBar].join(" ")}
			>
				<div className="container mx-auto h-100 d-flex">
					<div className="d-flex align-items-center">

						
						<Image src="/assets/grass.png" width={36} height={36} />
						<Image src="/assets/logo.png" width={200} height={32} />
					</div>

					<nav className="ml-4">
						<NavigationItems>
							<NavigationItem icon={faHome} click={() => router.push("/")}>
								Home
							</NavigationItem>
							<NavigationItem icon={faEnvelope} click={() => router.push("/contact")}>
								Contact
							</NavigationItem>
							{/* <NavigationItem icon={faStar} click={() => router.push("/sponsor")}>
								Go Sponsored
							</NavigationItem>  */}
						</NavigationItems>
					</nav>

					<div className="ml-auto d-flex align-items-center">
						{/* <Button type="submit" variant='light'>Login</Button> */}

						{/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button type="submit" variant='light'>Submit</Button>
                    </Form> */}

						<nav className="ml-4">
							{this.props.authenticated ? (
								<NavigationItems>
									<NavigationItem
										icon={faEdit}
										click={() => router.push("/server/manage")}
									>
										Manage Servers
									</NavigationItem>
									<NavigationItem
										icon={faPlus}
										click={() => router.push("/server/add")}
									>
										Add Server
									</NavigationItem>
									<NavigationItem
										icon={faSignOutAlt}
										click={() => router.push("/logout")}
									>
										Logout
									</NavigationItem>
								</NavigationItems>
							) : (
								<NavigationItems>
									<NavigationItem
									icon={faSignInAlt}
										click={() => router.push("/login")}
									>
										Login
									</NavigationItem>
									<NavigationItem
										icon={faUser}
										click={() => router.push("/register")}
									>
										Register
									</NavigationItem>
								</NavigationItems>
							)}
						</nav>
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(NavigationBar);
