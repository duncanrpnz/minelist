import React, { useEffect, useState } from "react";
import { wrapper } from "../../../redux";
import { checkServerSideCookie } from "../../../redux/actions/auth";
import { useRouter } from "next/router";
import Layout from "../../../hoc/Layout/Layout";
import ServerAdd from "../../../containers/Server/ServerAdd/ServerAdd";

const manageServer = (props) => {
	const router = useRouter();
	const { serverId } = router.query;

	return (
		<Layout authenticated={props.token ? true : false}>
			<ServerAdd id={serverId}/>
		</Layout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
        await checkServerSideCookie(context);

		const token = context.store.getState().token;

		if (!token) {
			context.res.writeHead(302, { Location: "/login" });
			context.res.end();
		}
		return {
			props: {
				token,
			},
		};
	}
);

export default manageServer;
