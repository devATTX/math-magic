import React, { useState } from "react";
import "./SortingPage.css"; // Importing the CSS file

// Function to generate sorting problems with random numbers
const generateSortingProblems = (numProblems, maxNum) => {
	const problems = [];
	for (let i = 0; i < numProblems; i++) {
		const numbers = new Set(); // Use a Set to avoid duplicates
		while (numbers.size < 4) {
			numbers.add(Math.floor(Math.random() * (maxNum + 1))); // Add random number if not already present
		}
		const uniqueNumbers = Array.from(numbers);
		const direction = Math.random() > 0.5 ? "ascending" : "descending";
		const correctOrder = [...uniqueNumbers].sort((a, b) => (direction === "ascending" ? a - b : b - a));

		problems.push({
			numbers: uniqueNumbers,
			direction,
			correctOrder,
			userAnswer: [], // Initially empty
			isCorrect: null,
		});
	}
	return problems;
};

const SortingPage = () => {
	const [problems, setProblems] = useState(generateSortingProblems(3, 999)); // Generate 3 sorting problems with default maxNum
	const [maxNum, setMaxNum] = useState(999); // State for maximum number input

	const handleClick = (num, problemIndex) => {
		const newProblems = [...problems];
		const problem = newProblems[problemIndex];

		// Toggle number in userAnswer: Add if not present, remove if already present
		if (problem.userAnswer.includes(num)) {
			problem.userAnswer = problem.userAnswer.filter((n) => n !== num); // Remove if already clicked
		} else {
			problem.userAnswer.push(num); // Add if not clicked
		}

		newProblems[problemIndex] = problem;
		setProblems(newProblems);
	};

	const checkAnswer = (problemIndex) => {
		const newProblems = problems.map((problem, i) =>
			i === problemIndex
				? {
						...problem,
						isCorrect: JSON.stringify(problem.userAnswer) === JSON.stringify(problem.correctOrder), // Check if userAnswer matches correctOrder
				  }
				: problem
		);
		setProblems(newProblems);
	};

	const clearSelections = (problemIndex) => {
		const newProblems = [...problems];
		newProblems[problemIndex].userAnswer = []; // Reset userAnswer to empty
		newProblems[problemIndex].isCorrect = null; // Reset correctness state
		setProblems(newProblems);
	};

	const handleGenerate = () => {
		// Check if maxNum is at least 10
		if (maxNum < 10) {
			alert("Please enter a maximum number of at least 10.");
			return;
		}
		setProblems(generateSortingProblems(3, maxNum)); // Generate new problems based on maxNum
	};

	return (
		<div className="sorting-background" style={{ padding: "20px" }}>
			<h1>Sorting Challenge</h1>
			<div style={{ marginBottom: "20px" }}>
				{" "}
				{/* Add spacing around the input and button */}
				<label>
					Max Number:
					<input
						type="number"
						value={maxNum}
						onChange={(e) => setMaxNum(Number(e.target.value))} // Update maxNum state on input change
						min="10" // Minimum value is set to 10
						style={{ marginLeft: "10px", marginRight: "10px", width: "100px" }} // Add margin and set width
					/>
				</label>
				<button onClick={handleGenerate} style={{ padding: "5px 10px" }}>
					Generate
				</button>
			</div>
			{problems.map((problem, index) => (
				<div key={index} className="problem-row">
					<h2>Problem {index + 1}</h2>
					<p>Sort {problem.direction === "ascending" ? "Least to Greatest" : "Greatest to Least"}:</p>

					<div className="numbers-container">
						{problem.numbers.map((num) => (
							<button
								key={num}
								className="number-button"
								onClick={() => handleClick(num, index)}
								style={{
									backgroundColor: problem.userAnswer.includes(num) ? "#007bff" : "#f0f0f0", // Change color if selected
									color: problem.userAnswer.includes(num) ? "#fff" : "#000",
								}}
							>
								{num}
							</button>
						))}
					</div>

					<div className="result-box">
						<h3>Your Order:</h3>
						<p>{problem.userAnswer.join(", ")}</p>
					</div>

					<button onClick={() => checkAnswer(index)}>Check Answer</button>
					<button onClick={() => clearSelections(index)} className="clear-button">
						Clear
					</button>
					{problem.isCorrect !== null && (
						<p className={problem.isCorrect ? "correct" : "incorrect"}>
							{problem.isCorrect ? "Correct!" : "Incorrect, try again!"}
						</p>
					)}
				</div>
			))}
		</div>
	);
};

export default SortingPage;
