import React from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Fade from "react-reveal/Fade";

export default function About({ resetData }) {
	// About component takes resetData() from App <Component> to trigger DB data reset
	return (
		<>
			<div className="container-custom">
				<Fade duration={500}>
					<div className="container my-5">
						<Alert variant="success">
							<Alert.Heading className="text-center">About</Alert.Heading>
							<hr />
							<h4 className="text-center">
								Medicinify is personal web-based medicine Tracker <br />
								<span role="img" aria-label="student">
								👨‍⚕️
								</span>
							</h4>
						</Alert>
					</div>
					<div className="container my-5">
						<h2 className="text-center">
						</h2>
						<h5 className="text-center">
							<Badge
								variant="danger"
								as="a"
								style={{ cursor: "pointer" }}
								onClick={() => {
									if (window.confirm("Are you sure you want to reset the progress !")) {
										resetData();
									}
								}}
							>
								Reset Progress
							</Badge>
						</h5>
						<h3 className="text-center my-5">
							<Badge>
								For the{" "}
								<span role="img" aria-label="orange-hearth">
									🧡
								</span>{" "}
								to code{" "}
							</Badge>{" "}
						</h3>
					</div>
				</Fade>
			</div>
		</>
	);
}
