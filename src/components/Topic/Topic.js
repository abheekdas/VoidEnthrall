import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Topic.css";

export default function Topic({ data, updateData }) {
	/*
	  This component takes data releted to a paticular topic 
	  and updateData() from App component
	*/

	/*
	  Setting state for fields that comes from `data` prop 
	  so that `data` prop is not undefined on reload
	*/
	const [select, setSelected] = useState([]);
	const [medicinesTableData, setMedicinesTableData] = useState([]);
	const [Date, setDate] = useState("");

	// updating states using useEffect with dependency  on `data` prop
	useEffect(() => {
		if (data !== undefined) {
			let doneMedicine = [];
			let tableData = data.medicines.map((medicine, index) => {
				if (medicine.Done) {
					doneMedicine.push(index);
				}

				/*
				|	Hidden properties `_is_selected` and `_search_text` are used to sort the table
				|	and search the table respectively. react-bootstrap-table does not allow sorting
				|	by selectRow by default, and requires plain text to perform searches.
				*/
				return {
					id: index,
					medicine: (
                        <a href="#" target="_blank" rel="noopener noreferrer" style={{ fontWeight: "600" }}>
                        {medicine.MedicineName}
                    </a>
					),
					_is_selected: medicine.Done,
					_search_text: medicine.MedicineName,
				};
			});
			setMedicinesTableData(tableData);
			setDate(data.Date);
			setSelected(doneMedicine);
		}
	}, [data]);

	// seacrh bar config
	const SearchBar = (props) => {
		const handleChange = (e) => {
			props.onSearch(e.target.value);
		};
		return (
			<div className="container container-custom2">
				<InputGroup className="mb-4">
					<FormControl
						className="text-center"
						placeholder="Search Medicine.. 🔍"
						aria-label="Search Question"
						aria-describedby="basic-addon2"
						onChange={handleChange}
					/>
				</InputGroup>
			</div>
		);
	};

	// table config
	const columns = [
		{
			dataField: "id",
			text: "M-Id",
			headerStyle: { width: "130px", fontSize: "20px" },
		},
		{
			dataField: "medicine",
			text: "Medicines",
			headerStyle: { fontSize: "20px" },
		},
		{
			dataField: "_is_selected",
			text: "Is Selected",
			headerStyle: { fontSize: "20px" },
			hidden: true,
			sort: true,
		},
		{
			dataField: "_search_text",
			text: "Search Text",
			headerStyle: { fontSize: "20px" },
			hidden: true,
		},
	];
	const rowStyle = { fontSize: "20px" };
	const selectRow = {
		mode: "checkbox",
		style: { background: "#c8e6c9" },
		selected: select,
		onSelect: handleSelect,
	};
	const sortMode = {
		dataField: "_is_selected",
		order: "asc",
	};

	// func() triggered when a question is marked done
	function handleSelect(row, isSelect) {
		let key = Date;
		let newDoneMedicines = [...select];
		let updatedMedicineStatus = data.medicines.map((medicine, index) => {
			if (row.id === index) {
				medicine.Done = isSelect;
				if (isSelect) {
					newDoneMedicines.push(row.id);
				} else {
					var pos = newDoneMedicines.indexOf(row.id);
					newDoneMedicines.splice(pos, 1);
				}
				return medicine;
			} else {
				return medicine;
			}
		});
		updateData(
			key,
			{
				started: newDoneMedicines.length > 0 ? true : false,
				doneQuestions: newDoneMedicines.length,
				questions: updatedMedicineStatus,
			},
			data.position
		);
		displayToast(isSelect, row.id);
	}

	// trigger an information message for user on select change
	function displayToast(isSelect, id) {
		const { type, icon, verb, dir } = {
			type: isSelect ? "Done" : "Incomplete",
			icon: isSelect ? "🎉" : "🙇🏻‍♂️",
			dir: isSelect ? "👇🏻" : "👆🏻",
		};

		const title = `Q-${id} Marked ${type} ${icon}`;
		const subTitle = `Question pushed to the ${dir} of the table.`;

		const Card = (
			<>
				<p>{title}</p>
				<p class="toast-subtitle">{subTitle}</p>
			</>
		);

		toast(Card, {
			className: `toast-${type}`,
			autoClose: 2000,
			closeButton: true,
		});
	}

	return (
		<>
			<h3 className="text-center mb-4">
				<Link to="/">Topics</Link>/{Date}
			</h3>

			{data === undefined ? (
				<div className="d-flex justify-content-center">
					<Spinner animation="grow" variant="success" />
				</div>
			) : (
				<ToolkitProvider className="float-right" keyField="id" data={medicinesTableData} columns={columns} rowStyle={rowStyle} search>
					{(props) => (
						<div>
							<SearchBar {...props.searchProps} />
							<div className="container container-custom" style={{ overflowAnchor: "none" }}>
								<Fade duration={600}>
									<BootstrapTable {...props.baseProps} selectRow={selectRow} sort={sortMode} />
								</Fade>
							</div>
						</div>
					)}
				</ToolkitProvider>
			)}
			<ToastContainer />
		</>
	);
}
