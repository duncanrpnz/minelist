import React from "react";
import Button from "../../../../components/UI/Button/Button";

export const description = (props) => {
	return (
		<React.Fragment>
			<div className="row p-4">
				<img
					className="mx-auto mb-4"
					src={`${process.env.api}servers/${props.id}/banner`}
				/>
			</div>
			<p className="p-3 text-justify">{props.description}</p>

            <Button>Vote</Button>
		</React.Fragment>
	);
};

export default description;
