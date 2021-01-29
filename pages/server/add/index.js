import React from "react";
import { wrapper } from "../../../redux";
import { checkServerSideCookie } from "../../../redux/actions/auth";
import { useRouter } from "next/router";
import Layout from "../../../hoc/Layout/Layout";
import ServerAdd from "../../../containers/Server/ServerAdd/ServerAdd";

import Head from "next/head";

export default function addServerIndex(props) {
	// const router = useRouter();

	// if(!props.token) {
	//     console.log('No auth');

	//     router.push('./auth/login');
	// }

	return (
		<Layout authenticated={props.token ? true : false}>
			<Head>
				<title>MineList - Add Server</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<ServerAdd />
		</Layout>
	);
}

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
