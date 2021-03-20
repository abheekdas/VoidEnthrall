import React from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import "./topicCard.css";

export default function TopicCard({ medicineData }) {
	// This component takes all the topicsData(here questionData ) and renders a TopicCard Component

	// Utility func() to find the progress in percentage
	const findPercentage = (doneMed, totalMedicines) => {
		return Math.round((doneMed / totalMedicines) * 100);
	};

	// Mapping medicineData to topicCard array
	let topicCard = medicineData.map((topic, index) => {
		let {Date, doneMedicine, medicines, started} = topic;
		let percentDone = findPercentage(doneMedicine, medicines.length);
		let mr = medicines.length - doneMedicine;
		if (started) {
			return (
				<Fade duration={500 + index * 0.4} key={index}>
					<div className="col mb-4">
						<Link to={`/${topic.date}`} style={{ textDecoration: "none" }}>
							<Card className="mb-3 inprogress-card animate__slideInDown hvr-grow">
								<Card.Body>
									<Row>
										<Col>
											<Card.Title className="topicName">{topic.date}</Card.Title>
										</Col>
										<Col>
											<h4>
												<Badge pill variant="success" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
													{mr === 0 ? "Done 👏🏻" : "Have 💊"}
												</Badge>
											</h4>
										</Col>
									</Row>
									<Card.Text className="totalQuestion">
										Total Medicines {topic.medicines.length} <br />
										{`${mr}`} More to go
									</Card.Text>
									<p className="percentDone mb-1">
										<b>{percentDone}% Done</b>
									</p>
									<ProgressBar animated={percentDone === 100 ? false : true} variant="success" now={percentDone} />
								</Card.Body>
							</Card>
						</Link>
					</div>
				</Fade>
			);
		} else {
			return (
				<Fade duration={500 + index * 50} key={index}>
					<div className="col mb-4 ">
						<Link to={`/${topic.Date}`} style={{ textDecoration: "none" }}>
							<Card className="mb-3 notstarted-card hvr-grow">
								<Card.Body>
									<Row>
										<Col>
											<Card.Title className="topicName"> {Date} </Card.Title>
										</Col>
										<Col>
											<h4>
												<Badge pill variant="primary" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
													Start Now
												</Badge>
											</h4>
										</Col>
									</Row>
									<Card.Text className="totalQuestion">Total Medicines {medicines.length}</Card.Text>
									<p className="percentDone mb-1">
										<b>
											<i>Not yet taken Medicine</i>
										</b>
									</p>
								</Card.Body>
							</Card>
						</Link>
					</div>
				</Fade>
			);
		}
	});
	return (
		<>
			<h3 className="app-heading2 text-center mb-5">
				Your Gateway to lead a Healthy Life!{" "}
				<span role="img" aria-label="hospital">
					🏥
				</span>
			</h3>
			<div className="container container-custom">
				<div className="row row-cols-1 row-cols-md-3 mt-3 grids">{topicCard}</div>
			</div>
		</>
	);
}
