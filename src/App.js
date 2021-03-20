import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getData, updateDBData, resetDBData } from "./services/dbServices";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import ReactGA from "react-ga";
import "./App.css";

function App() {

	// setting state for data received from the DB
	const [medicineData, setmedicineData] = useState([]);

	// useEffect for fetching data from DB on load and init GA
	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
		ReactGA.pageview(window.location.pathname + window.location.search);
		getData((MedicineData) => {
			setmedicineData(MedicineData);
		});
	}, []);

	//to update progress in '/' route and also update DB
	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = medicineData.map((topic, index) => {
			if (index === topicPosition) {
				updateDBData(key, topicData);
				return { Date: topic.Date, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setmedicineData(reGenerateUpdatedData);
	}

	// reset and clear DB 
	function resetData() {
		resetDBData((response) => {
			setmedicineData([]);
			window.location.replace(window.location.origin);
		});
	}

	return (
		<Router>
			<div className="App">
				<h1 className="app-heading text-center mt-5">Medicinify!</h1>
				{medicineData.length === 0 ? (
					// load spinner until data is fetched from DB
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="success" />
					</div>
				) : (
						<>
							{/* HOME AND ABOUT ROUTE */}
							<Route exact path="/" children={<TopicCard medicineData={medicineData}></TopicCard>} />
							<Route path="/about" children={<About resetData={resetData}></About>} />

							{/* TOPIC ROUTE */}
							<Route path="/Monday" children={<Topic data={medicineData[0]} updateData={updateData} />} />
							<Route path="/Tuesday" children={<Topic data={medicineData[1]} updateData={updateData} />} />
              <Route path="/Wednesday" children={<Topic data={medicineData[2]} updateData={updateData} />} />
              <Route path="/Thursday" children={<Topic data={medicineData[3]} updateData={updateData} />} />
              <Route path="/Friday" children={<Topic data={medicineData[4]} updateData={updateData} />} />
              <Route path="/Saturday" children={<Topic data={medicineData[5]} updateData={updateData} />} />
              <Route path="/Sunday" children={<Topic data={medicineData[6]} updateData={updateData} />} />
						</>

					)}
				<Footer></Footer>
			</div>
		</Router>
	);
}

export default App;
