import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdditionProblems from "./AdditionProblems";
import SortingPage from "./SortingPage";

const App = () => {
	return (
		<Router>
			<div style={{ padding: "30px" }}>
				<h1>Math App</h1>
				<nav>
					<ul style={{ listStyle: "none", padding: 0 }}>
						<li>
							<Link to="/addition">Addition Problems</Link>
						</li>
						<li>
							<Link to="/sorting">Sorting Problems</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/addition" element={<AdditionProblems />} />
					<Route path="/sorting" element={<SortingPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
