import React, { Component, useState } from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./NavigationBar.module.css";

import NavigationItems from "./NavigationItems/NavigationItems";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";

import { Input, Form, FormControl, Button } from "react-bootstrap";

import { withRouter } from "next/router";

import { connect } from "react-redux";

import { deauthenticate } from "../../redux/actions/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faSignOutAlt,
	faSignInAlt,
	faEdit,
	faPlus,
	faHome,
	faStar,
	faEnvelope,
	faBars,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";



class NavigationBar extends Component {
	state = {
		sideBarOpen: false,
	};

	sideBarOpenClickHandler = () => {
		this.setState({
			sideBarOpen: true,
		});
	};

	sideBarCloseClickHandler = () => {
		this.setState({
			sideBarOpen: false,
		});
	};

	render() {
		const router = this.props.router;

		let staticNavBarItems = (
			<React.Fragment>
				<NavigationItem icon={faHome} click={() => router.push("/")}>
					Home
				</NavigationItem>
				<NavigationItem
					icon={faEnvelope}
					click={() => router.push("/contact-us")}
				>
					Contact
				</NavigationItem>
			</React.Fragment>
		);

		let navBarItems = (
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
		);

		if (!this.props.authenticated) {
			navBarItems = (
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
			);
		}

		const sideBarClasses = [classes.SideBar];

		if (this.state.sideBarOpen) {
			sideBarClasses.push(classes.Open);
		}

		const sidebarTransitionStyles = {
			entering: { transform: "translateY(-500px)" },
			entered: { transform: "translateY(0)" },
			exiting: { transform: "translateY(0)" },
			exited: { transform: "translateY(-500px)" },
		};

		const backdropTransitionStyles = {
			entering: { background: "rgba(0, 0, 0, 0)", display: "none" },
			entered: { background: "rgba(0, 0, 0, 0.5)", display: "block" },
			exiting: { background: "rgba(0, 0, 0, 0.5)", display: "block" },
			exited: { background: "rgba(0, 0, 0, 0)", display: "none" },
		};

		return (
			<React.Fragment>
				
				<CSSTransition in={this.state.sideBarOpen} timeout={0}>
					{(state) => {
						return (
							<div
								className={classes.Backdrop}
								style={{ ...backdropTransitionStyles[state] }}
								onClick={this.sideBarCloseClickHandler}
							></div>
						);
					}}
				</CSSTransition>

	
					<div
						className={sideBarClasses.join(" ")}
						onClick={this.sideBarCloseClickHandler}
					>
						<div className="mt-auto w-100">
							{staticNavBarItems}
							{navBarItems}
						</div>
					</div>
			
				<header
					className={["container-fluid", classes.NavigationBar].join(
						" "
					)}
				>
					<div className="container mx-auto h-100 d-flex">
						<div className="d-flex align-items-center">
							<a
								href="#"
								onClick={() => router.push("/")}
								className="m-0 p-0"
							>
								<Image
									src="/assets/grass.png"
									alt="minecraft grass block"
									title="minecraft grass block"
									width={36}
									height={36}
								/>
								<Image
									src="/assets/logo.png"
									alt="Mine-list.com - Minecraft server list"
									title="Mine-list.com - Minecraft server list"
									width={200}
									height={32}
								/>
							</a>
						</div>

						<nav className="ml-4 d-none d-md-flex">
							<NavigationItems>
								{staticNavBarItems}
							</NavigationItems>
						</nav>

						<div className="ml-auto d-flex align-items-center">
							<FontAwesomeIcon
								icon={faBars}
								size="2x"
								onClick={this.sideBarOpenClickHandler}
								color="white"
								className="d-sm-block d-md-none  cursor-pointer"
							></FontAwesomeIcon>

							<nav className="ml-4 d-none d-md-flex">
								{navBarItems}
							</nav>
						</div>
					</div>
				</header>
			</React.Fragment>
		);
	}
}

export default withRouter(NavigationBar);
