import React, {useEffect, useState} from "react";
import classes from "./ServerView.module.css";
import Moment from "moment";

import StatusIndicator from "../../../components/Server/StatusIndicator/StatusIndicator";
import Button from "../../../components/UI/Button/Button";

import Description from "./Description/Description";
import Stats from "./Stats/Stats";

const serverView = (props) => {
	const classesArr = ["container-fluid", "d-flex", classes.Toolbar];
    const rowClasses = ["row", classes.ServerPropertyRow];
    
    const [selectedTab, setSelectedTab] = useState(<Description {...props}/>)

    
	return (
		<React.Fragment>
			<div className={classesArr.join(" ")}>
				<div className="d-flex align-items-center flex-grow flex-flow-row p-3">
					<h3 className="mb-0">{props.name}</h3>
				</div>

				<div className="d-flex h-100">
					<ul className={classes.Tabs}>
						<li className={classes.TabItem} onClick={() => setSelectedTab(<Description {...props}/>)}>Description</li>
						<li className={classes.TabItem} onClick={() => setSelectedTab(<Stats serverId={props.id}/>)}>Stats</li>
						<li className={classes.TabItem}>Widget</li>
					</ul>
				</div>
			</div>

			<div className="container-fluid d-flex no-margin ml-0 mr-0 pl-0 pr-0">
				<div
					className={[
						classes.ServerProperties,
						"col-md-4",
						"h-100",
					].join(" ")}
				>
					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Status</strong>
						</div>

						<div className="col-md-6">
							<StatusIndicator online={props.online} />
						</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Host / IP</strong>
						</div>

						<div className="col-md-6">{props.ip}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Port</strong>
						</div>

						<div className="col-md-6">{props.port}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Players</strong>
						</div>

						<div className="col-md-6">
							{props.players_online}/{props.max_players}
						</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Votes</strong>
						</div>

						<div className="col-md-6">{props.total_votes}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Uptime</strong>
						</div>

						<div className="col-md-6">
							{props.uptime.toFixed(2)}%
						</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Website</strong>
						</div>

						<div className="col-md-6">
							<a href={props.social_website} target="_blank">
								{props.social_website}
							</a>
						</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Discord</strong>
						</div>

						<div className="col-md-6">{props.social_discord}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Version</strong>
						</div>

						<div className="col-md-6">{props.version}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Country</strong>
						</div>

						<div className="col-md-6">{props.country}</div>
					</div>

					<div className={rowClasses.join(" ")}>
						<div className="col-md-6">
							<strong>Last Checked</strong>
						</div>

						<div className="col-md-6">
							{Moment(props.last_polled).fromNow()}
						</div>
					</div>
				</div>

				{/* Tabs Content */}
				<div className="col-md-8 d-flex flex-column justify-content-between align-items-center">
                    {selectedTab}
				</div>
			</div>
		</React.Fragment>
	);
};

export default serverView;
