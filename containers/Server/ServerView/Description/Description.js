import React from "react";
import Button from "../../../../components/UI/Button/Button";

export const description = (props) => {
	return (
		<div class="container">
			<div className="row pt-4">
				<div className="col-md-12 text-center">
					<img
						className="mb-4"
						src={`${process.env.NEXT_PUBLIC_api}servers/${props.id}/banner`}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<p className="text-break text-justify">{props.description}</p>
				</div>
			</div>

			<Button>Vote</Button>
		</div>
	);
};

export default description;
