import React, { useEffect, useState } from "react";
import { wrapper } from "../../redux";
import { checkServerSideCookie } from "../../redux/actions/auth";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../hoc/Layout/Layout";
import ServerView from "../../containers/Server/ServerView/ServerView";
import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";

export default function serverIndex(props) {
	const router = useRouter();
	const { serverId } = router.query;

	const [server, setServer] = useState(null);

	useEffect(() => {
		let url = "http://localhost:3001/servers/" + serverId;

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
		display = <ServerView {...server}/>
	}

	return (
		<Layout authenticated={props.token ? true : false}>{display}</Layout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		checkServerSideCookie(context);
		const token = context.store.getState().token;

		return {
			props: {
				token,
			},
		};
	}
);
