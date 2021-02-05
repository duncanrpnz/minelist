import React, { useEffect, useState, useRef } from "react";

import FormContainer from "../../components/FormContainer/FormContainer";

import { faStar, faInfoCircle, faBid } from "@fortawesome/free-solid-svg-icons";

import axios from "../../axios";

import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import PagedTable from "../../components/PagedTable/PagedTable";

const sponsor = (props) => {
	const [auctionInfo, setAuctionInfo] = useState(null);
	const [myServers, setMyServers] = useState(null);
    const [bid, setBid] = useState({
        server: null,
        amount: 0.0
    });

	const bidTableRef = useRef(null);

	useEffect(() => {
		axios.get("/auction/latest").then((result) => {
			if (result.status === 200) {
				setAuctionInfo(result.data);
			}
		});

		axios.get("/servers/myservers").then((result) => {
			if (result.status === 200) {
                setMyServers(result.data.data);

			}
		});
	}, []);

	useEffect(() => {
		if (auctionInfo) {
			bidTableRef.current.loadPage();
		}
    }, [auctionInfo]);

    useEffect(() => {
        if(myServers && myServers.length > 0) {
            setBid({...bid, server: myServers[0].id})
        }
    }, [myServers]);
    
    const bidServerSelectHandler = (e) => {
        setBid({...bid, server: e.target.value});
    };

    const bidAmountChangeHandler = (e) => {
        setBid({...bid, amount: e.target.value});
    };

    const bidPlaceClickHandler = (e) => {

        const server = bid.server;
        const amount = bid.amount;

        const data = {
            serverId: server,
            amount: amount
        };

        console.log(auctionInfo);

        axios.post(`/auction/${auctionInfo['Auction ID']}/bids`, data).then(result => {
            bidTableRef.current.loadPage();
        });
    };

	let serverOptions = [];
    let defaultOption = "Loading...";

	if (myServers) {
        defaultOption = myServers[0].name;

		serverOptions = myServers.map((server) => {
			return { text: server.name, value: server.id };
		});
    }
  


	return (
		<React.Fragment>
			<FormContainer
				icon={faStar}
				title="Go Sponsored"
				className={["col-md-12"]}
			>
				<p className="text-justify">
					Sponsored server status elevates your server above the rest.
					A sponsored server appears above the main server list and
					are servers users first see when they visit mine-list.
				</p>

				<p className="text-justify">
					There are a total of 5 sponsored slots available, and are
					auctioned off every two weeks.
				</p>

				<p className="text-justify">
					Accepted payments methods are via PayPal.
				</p>
			</FormContainer>

            
			<div className="container-fluid mt-3">
				<div className="row justify-content-around d-flex">
					<FormContainer title="Auction" className={["col-md-6"]}>
						<div className="mt-2 container-fluid">
							<div className="row">
								<Input
									attributes={{ type: "select" }}
                                    options={serverOptions}
                                    changed={bidServerSelectHandler}
								/>
							</div>
							<div className="row">
								<Input
									className="mb-0"
									attributes={{
										type: "text",
                                        placeholder: "Enter your bid",
                                        value: bid.amount
                                    }}
                                    changed={bidAmountChangeHandler}
								/>

								<Button clicked={bidPlaceClickHandler}>Place Bid</Button>
							</div>
						</div>

						<PagedTable
							ref={bidTableRef}
							url={`/auction/${
								auctionInfo ? auctionInfo["Auction ID"] : 0
							}/bids`}
							noDataMsg={
								<div className="col-md-12">
									<p className="mx-auto">
										<strong>
											No bids have been placed
										</strong>
									</p>
								</div>
							}
							page={1}
							pageSize={5}
							maxButtonsCount={6}
							columns={["Server", "Amount"]}
							itemRenderer={(dataItem) => {
								return (
									<tr key={dataItem.id}>
										<td>{dataItem.name}</td>
										<td>${dataItem.amount.toFixed(2)}</td>
									</tr>
								);
							}}
						/>
					</FormContainer>

					<FormContainer
						icon={faInfoCircle}
						title="Auction Information"
						className={["col-md-6"]}
					>
						{!auctionInfo ? (
							<LoadingIndicator />
						) : (
							<table width="100%">
								<tbody>
									{Object.keys(auctionInfo).map((key) => {
										return (
											<tr key={key}>
												<td className="font-weight-bold">
													{key}
												</td>
												<td>{auctionInfo[key]}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</FormContainer>
				</div>
			</div>
		</React.Fragment>
	);
};

export default sponsor;
