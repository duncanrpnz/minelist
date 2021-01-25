import React from "react";
import { useRouter } from 'next/router';
import { wrapper } from "../redux";
import { checkServerSideCookie } from "../redux/actions/auth";


import Head from "next/head";

import Server from "../containers/ServerList/Server/Server";
import PagedTable from "../components/PagedTable/PagedTable";
import Layout from "../hoc/Layout/Layout";

export default function Home(props) {

	const router = useRouter();

	const serverClickedHandler = (id) => {
		router.push(`/server/${id}`);
	};

	return (
		<Layout authenticated={props.token ? true : false}>
			<PagedTable
				sponsored
				url="http://localhost:3001/servers/sponsored"
				page={1}
				pageSize={5}
				maxButtonsCount={6}
				columns={["Rank", "Name", "Server", "Players", "Status"]}
				itemRenderer={(dataItem) => {
					return (
						<Server
							{...dataItem}
							key={dataItem.id}
							clicked={serverClickedHandler}
						/>
					);
				}}
			/>

			<PagedTable
				url="http://localhost:3001/servers"
				page={1}
				pageSize={15}
				maxButtonsCount={6}
				columns={["Rank", "Name", "Server", "Players", "Status"]}
				itemRenderer={(dataItem) => {
					return (
						<Server
							{...dataItem}
							key={dataItem.id}
							clicked={serverClickedHandler}
						/>
					);
				}}
			/>
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
  

  