import React from "react";
import classes from "./ConfirmDialog.module.css";
import Button from "../Button/Button";

const confirmDialog = (props) => {
	return props.show ? (
			<React.Fragment>
				<div className={classes.BackDrop}></div>

				<div className={classes.ConfirmDialog}>
					<div className="container">
						<div className="row text-center">
							<div className="col-md-12">
								<h3 className="mx-auto">{props.title}</h3>
							</div>
						</div>

						<div className="row text-center mt-4">
							<div className="col-md-12">
								<h6>{props.subtitle}</h6>
							</div>
						</div>

						<div className="row mt-4">
							<div className="col-md-6">
								<Button clicked={props.cancel}>Cancel</Button>
							</div>
							<div className="col-md-6">
								<Button clicked={props.confirm}>OK</Button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
            
	) : null
};

export default confirmDialog;
