import axios from "../../axios";
import React, { Component } from "react";
import { wrapper } from "../../redux";
import { Input, Form, FormControl, Button, Table } from "react-bootstrap";
import classes from "./PagedTable.module.css";

import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";

import { connect } from "react-redux";

class PagedTable extends Component {
	state = {
		currentPage: this.props.page,
		loading: false,
		data: null,
		error: null,
		totalPages: 1,
	};

	componentDidMount() {
		this.loadPage();
	}

	loadPage = (page) => {
		console.log("Props: ", this.props);
		if (!page) {
			page = this.state.currentPage;
		}

		let url = `${process.env.api}?page=${page}&pageSize=${this.props.pageSize}`;

		this.setState({ loading: true });

		axios({
			url: url,
			method: "GET",
		})
			.then((result) => {
				console.log("Results: ", result);

				this.setState({
					loading: false,
					data: result.data.data,
					currentPage: page,
					totalPages: parseInt(
						result.data.total / this.props.pageSize
					),
				});
			})
			.catch((error) => {
				console.log("Load error: " + error);

				this.setState({ loading: false, error: error });
			});
	};

	setPageHandler = (page) => {
		console.log("Loading page = " + page);

		this.loadPage(page);
	};

	render() {
		let tableContent = (
			<tr>
				<td colSpan="100%">
					<div className="pt-5">
						<LoadingIndicator />
					</div>
				</td>
			</tr>
		);

		if (!this.state.loading) {
			if (this.state.data && this.state.data.length > 0) {
				tableContent = this.state.data.map((dataItem) =>
					this.props.itemRenderer(dataItem)
				);
			} else {
				tableContent = (
					<tr>
						<td colSpan="100%">
							<div className="pt-5 text-center">
								<h5>No servers to display</h5>
							</div>
						</td>
					</tr>
				);
			}
		}

		let paginationButtons = [];
		let displayArrowsLeft = false;
		let displayArrowsRight = true;
		let pageButtonClasses = [classes.Button];

		if (this.state.totalPages > 1) {
			if (
				this.state.currentPage >= this.props.maxButtonsCount - 2 &&
				this.state.totalPages > this.props.maxButtonsCount
			) {
				displayArrowsLeft = true;

				let start = parseInt(
					this.state.currentPage - this.props.maxButtonsCount / 2
				);

				let end = parseInt(
					this.state.currentPage + this.props.maxButtonsCount / 2
				);

				if (end > this.state.totalPages) {
					end = start + (this.state.totalPages - start) + 1;
					start -= this.props.maxButtonsCount - (end - start);
					if (start < 1) {
						start = 1;
					}

					displayArrowsRight = false;
				}

				for (let i = start; i <= end; i++) {
					i === this.state.currentPage
						? (pageButtonClasses = [
								classes.PageButton,
								classes.activePage,
						  ])
						: (pageButtonClasses = [classes.PageButton]);

					paginationButtons.push(
						<button
							className={pageButtonClasses.join(" ")}
							key={i}
							onClick={() => this.setPageHandler(i)}
						>
							{i}
						</button>
					);
				}
			} else {
				displayArrowsLeft = false;

				for (let i = 1; i <= this.props.maxButtonsCount; i++) {
					i === this.state.currentPage
						? (pageButtonClasses = [
								classes.PageButton,
								classes.activePage,
						  ])
						: (pageButtonClasses = [classes.PageButton]);

					paginationButtons.push(
						<button
							key={i}
							className={pageButtonClasses.join(" ")}
							onClick={() => this.setPageHandler(i)}
						>
							{i}
						</button>
					);
				}
			}
		} else {
			displayArrowsRight = false;
			displayArrowsLeft = false;
		}

		let leftButtons = [
			<button
				key="toStart"
				className={classes.PageButton}
				onClick={() => this.setPageHandler(1)}
			>
				{"<<"}
			</button>,
			<button
				key="backOne"
				className={classes.PageButton}
				onClick={() => this.setPageHandler(this.state.currentPage - 1)}
			>
				{"<"}
			</button>,
		];

		let rightButtons = [
			<button
				key="forwardOne"
				className={classes.PageButton}
				onClick={() => this.setPageHandler(this.state.currentPage + 1)}
			>
				{">"}
			</button>,
			<button
				key="toEnd"
				className={classes.PageButton}
				onClick={() => this.setPageHandler(this.state.totalPages + 1)}
			>
				{">>"}
			</button>,
		];

		if (displayArrowsLeft) {
			paginationButtons = [...leftButtons, ...paginationButtons];
		}

		if (displayArrowsRight) {
			paginationButtons = [...paginationButtons, ...rightButtons];
		}

		return (
			<div key={this.props.key}>
				<h3 className="mb-4">
					{this.props.sponsored
						? "Sponsored Servers"
						: "Minecraft Servers"}
				</h3>

				<Table
					key={new Date().getTime()}
					response="sm"
					size="sm"
					className={classes.PagedTable}
				>
					<thead>
						<tr>
							{this.props.columns.map((column) => (
								<th key={column}>{column}</th>
							))}
						</tr>
					</thead>

					<tbody>{tableContent}</tbody>
				</Table>

				<div className="row">{paginationButtons}</div>
			</div>
		);
	}
}

export default PagedTable;
