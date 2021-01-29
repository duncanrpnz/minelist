import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { wrapper } from "../../../redux";
import { checkServerSideCookie } from "../../../redux/actions/auth";

import Layout from "../../../hoc/Layout/Layout";
import PagedTable from "../../../components/PagedTable/PagedTable";
import ManageServer from "../../../components/Server/ManageServer/ManageServer";
import ConfirmDialog from "../../../components/UI/ConfirmDialog/ConfirmDialog";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios";

export default function manageIndex(props) {
	const router = useRouter();
	const myServers = useRef();
	const confirmDialogRef = useRef();

	const [showConfirm, setShowConfirm] = useState(false);
	const [deleteContext, setDeleteContext] = useState(null);

	const deleteClickedHandler = (id) => {
		setDeleteContext(id);
		setShowConfirm(true);
	};

	const editClickedHandler = (id) => {
		router.push(`/server/manage/${id}`);
	};

	const serverClickedHandler = (id) => {
		router.push(`/server/${id}`);
	};

	const confirmDialogCancelHandler = () => {
		setShowConfirm(false);
	};

	const confirmDialogConfirmHandler = async () => {
		await axios
			.delete(`/servers/${deleteContext}`)
			.then((response) => {
				setDeleteContext(null);
				setShowConfirm(false);
				myServers.current.loadPage();
			})
			.catch((err) => {
				setDeleteContext(null);
				setShowConfirm(false);
			});
	};

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	return (
		<Layout authenticated={props.token ? true : false}>
			<ConfirmDialog
				show={showConfirm}
				title="Are you sure?"
				subtitle="You are about to delete your server listing, this cannot be undone"
				cancel={confirmDialogCancelHandler}
				confirm={confirmDialogConfirmHandler}
			/>

			<PagedTable
				ref={myServers}
				title="My Servers"
				url="/servers/myservers"
				noDataMsg={
					<p className="col-md-6 offset-md-3 text-center">
						<h5 className="mx-auto">
							You have not posted any servers yet.
						</h5>

						<br /> <Button className="mt-4 w-auto" clicked={() => router.push('/server/add')}>Add Server</Button>
					</p>
				}
				page={1}
				pageSize={5}
				maxButtonsCount={6}
				columns={["Rank", "Name", "Server", "Players", "Actions"]}
				itemRenderer={(dataItem) => {
					return (
						<ManageServer
							{...dataItem}
							key={dataItem.id}
							deleteClicked={() =>
								deleteClickedHandler(dataItem.id)
							}
							editClicked={() => editClickedHandler(dataItem.id)}
							// clicked={() => serverClickedHandler(dataItem.id)}
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
