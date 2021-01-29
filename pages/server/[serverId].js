import React, { useEffect, useState } from "react";
import { wrapper } from "../../redux";
import { checkServerSideCookie } from "../../redux/actions/auth";
import { useRouter } from "next/router";
import axios from "../../axios";
import Layout from "../../hoc/Layout/Layout";
import ServerView from "../../containers/Server/ServerView/ServerView";
import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";
import Head from "next/head";

export default function serverIndex(props) {
	const router = useRouter();
	const { serverId } = router.query;

	const [server, setServer] = useState(null);

	useEffect(() => {
		let url = "/servers/" + serverId;

		axios({
			url: url,
			method: "GET",
		})
			.then((result) => {
				console.log(result.data[0]);

				setServer(result.data[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [serverId]);

	let display = <LoadingIndicator />;

	if (server) {
		display = <ServerView {...server} />;
	}

	return (
		<Layout authenticated={props.token ? true : false}>
			<Head>
				<title>MineList - Viewing {server ? server.name : "Server"}</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			{display}
		</Layout>
	);
}
export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		await checkServerSideCookie(context);
		const token = context.store.getState().token;

		return {
			props: {
				token,
			},
		};
	}
);
