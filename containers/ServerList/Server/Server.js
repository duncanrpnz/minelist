import React, { Component } from "react";
import classes from "./Server.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { withRouter } from "next/router";
import StatusIndicator from "../../../components/Server/StatusIndicator/StatusIndicator";

class Server extends Component {
	render() {
		console.log(this.props.online);

		let rank = this.props.rank;

		if (this.props.sponsored) {
			rank = <FontAwesomeIcon icon={faStar} size="1x" />;
		}

		const link = `/server/${this.props.id}`;

		return (
			<tr
				className={classes.Server}
				onClick={() => this.props.clicked(this.props.id)}
			>
				<td className="text-center">{this.props.rank}</td>
				<td className={[classes.name, "text-left"].join(" ")}>
					<strong>{this.props.name}</strong>
				</td>
				<td>
					<img
						className={classes.banner}
						src={`http://localhost:3001/servers/${this.props.id}/banner`}
						onClick={() => this.props.clicked(this.props.id)}
					/>
				</td>
				<td className="text-center">
					{this.props.players_online}/{this.props.max_players ?? 20}
				</td>
				<td className="text-center">
					<StatusIndicator online={this.props.online} />
				</td>
			</tr>
		);
	}
}

export default withRouter(Server);
