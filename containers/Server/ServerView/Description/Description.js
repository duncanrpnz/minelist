import React from "react";
import Button from "../../../../components/UI/Button/Button";

export const description = (props) => {


	return (
		<div className="container h-100 d-flex flex-column">
			<div className="row pt-4 mb-3">
				<div className="col-md-12 text-center">
					<img
						alt={`Server advertisement banner for ${props.name}`}
						title={`Server advertisement banner for ${props.name}`}
						className="mb-4"
						src={`${process.env.NEXT_PUBLIC_api}servers/${props.id}/banner`}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<p className="text-break text-justify overflow-y-scroll">{props.description}</p>
				</div>
			</div>

			<Button className="mt-auto" clicked={props.voteClicked}>Vote</Button>
		</div>
	);
};

export default description;
