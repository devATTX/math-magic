import React, { useState } from "react";
import "./AdditionProblems.css"; // Include the CSS

const generateMathProblems = (numProblems, maxSum) => {
	const problems = [];

	for (let i = 0; i < numProblems; i++) {
		const num1 = Math.floor((Math.random() * (maxSum + 1)) / 2); // Ensuring first number is <= maxSum/2
		const num2 = Math.floor(Math.random() * (maxSum - num1)); // Ensuring sum doesn't exceed maxSum
		const correctAnswer = num1 + num2;

		// Generate three random incorrect answers, ensuring they are unique and within a reasonable range
		const incorrectAnswers = new Set();
		while (incorrectAnswers.size < 3) {
			const randomAnswer = Math.floor(Math.random() * (maxSum + 1));

			// Avoid infinite loop if all possible answers have already been used
			if (randomAnswer !== correctAnswer && !incorrectAnswers.has(randomAnswer)) {
				incorrectAnswers.add(randomAnswer);
			}

			// Safety check: If the incorrectAnswers set cannot grow, break the loop
			if (incorrectAnswers.size + 1 >= maxSum) {
				break;
			}
		}

		// Mix correct and incorrect answers
		const options = [...incorrectAnswers];
		options.splice(Math.floor(Math.random() * 4), 0, correctAnswer); // Place the correct answer randomly

		problems.push({
			num1,
			num2,
			correctAnswer,
			options,
			userAnswer: null,
			isCorrect: null,
		});
	}

	return problems;
};

const MathProblem = ({ problem, index, handleAnswerClick }) => (
	<div className="problem-box">
		<p className="problem-text">
			{problem.num1} + {problem.num2}
		</p>
		<div className="answer-button-container">
			{problem.options.map((option, i) => (
				<button
					key={i}
					onClick={() => handleAnswerClick(index, option)}
					className="answer-button"
					style={{
						backgroundColor:
							problem.userAnswer === option
								? problem.isCorrect === null
									? "lightblue"
									: problem.isCorrect
									? "lightgreen"
									: "salmon"
								: "white",
					}}
				>
					{option}
				</button>
			))}
		</div>
	</div>
);

const AdditionProblems = () => {
	const [maxSum, setMaxSum] = useState(18); // Default to 18
	const [problems, setProblems] = useState(generateMathProblems(20, maxSum));
	const [showResults, setShowResults] = useState(false);

	const handleAnswerClick = (problemIndex, selectedAnswer) => {
		setProblems((prevProblems) =>
			prevProblems.map((problem, index) =>
				index === problemIndex
					? {
							...problem,
							userAnswer: selectedAnswer,
							isCorrect: null, // Reset correctness when re-selecting an answer
					  }
					: problem
			)
		);
	};

	const handleSubmit = () => {
		setProblems((prevProblems) =>
			prevProblems.map((problem) => ({
				...problem,
				isCorrect: problem.userAnswer === problem.correctAnswer,
			}))
		);
		setShowResults(true);
	};

	const handleGenerate = () => {
		setProblems(generateMathProblems(20, maxSum));
		setShowResults(false); // Reset results when new problems are generated
	};

	const correctCount = problems.filter((problem) => problem.isCorrect === true).length;

	return (
		<div>
			<h1>Addition Questions</h1>
			<div style={{ marginBottom: "20px" }}>
				<label>
					Max Sum:
					<input
						type="number"
						value={maxSum}
						onChange={(e) => setMaxSum(Number(e.target.value))}
						min="1"
						style={{ marginLeft: "10px", marginRight: "10px", width: "60px" }}
					/>
				</label>
				<button className="page-button" onClick={handleGenerate}>
					Generate
				</button>
			</div>
			<div className="problems-grid">
				{problems.map((problem, index) => (
					<MathProblem key={index} problem={problem} index={index} handleAnswerClick={handleAnswerClick} />
				))}
			</div>
			<button onClick={handleSubmit} style={{ marginTop: "20px" }}>
				Submit
			</button>
			{showResults && (
				<p>
					You got {correctCount} out of {problems.length} correct!
				</p>
			)}
		</div>
	);
};

export default AdditionProblems;
