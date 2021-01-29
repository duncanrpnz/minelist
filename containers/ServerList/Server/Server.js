import React, { Component } from "react";
import classes from "./Server.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faSpinner,
	faWifi,
	faCopy,
} from "@fortawesome/free-solid-svg-icons";
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

		let rankClasses = [classes.Rank];

		if(this.props.sponsored) {
			rankClasses.push(classes.Sponsored);
		}

		return (
			<tr
				className={[classes.Server].join(" ")}
				
			>
				<td className="text-center" width="8%">
					<span className={rankClasses.join(' ')}>{rank}</span>
				</td>
				<td className={[classes.name, "text-left"].join(" ")} width="18%">
					<strong onClick={() => this.props.clicked(this.props.id)}>{this.props.name}</strong>
				</td>
				<td width="468px">
					<div className="row text-center">
						<img
							className={classes.banner}
							src={`${process.env.NEXT_PUBLIC_api}servers/${this.props.id}/banner`}
							onClick={() => this.props.clicked(this.props.id)}
						/>
					</div>
					<div className={["row", "text-right", classes.ServerIp].join(" ")}>
						<FontAwesomeIcon icon={faWifi} size="1x" className="mr-2 ml-1"/>
						{this.props.ip}
					</div>
				</td>
				<td className="" width="5%">
					{this.props.players_online}/{this.props.max_players ?? 20}
				</td>
				<td className="text-center" width="15%">
					<StatusIndicator online={this.props.online} />
				</td>
			</tr>
		);
	}
}

export default withRouter(Server);
