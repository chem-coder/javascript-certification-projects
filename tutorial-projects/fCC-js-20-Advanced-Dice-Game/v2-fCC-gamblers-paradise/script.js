const listOfAllDice = document.querySelectorAll(".die");
// const scoreOptions = document.getElementById("score-options");
// const scoreInputs = scoreOptions.querySelectorAll("div > input"); 
// const scoreSpans = scoreOptions.querySelectorAll("div > label > span");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rules = [
	{
		name: "Three of a kind",
		condition: "Three of a kind",
		index: 0,
		score(diceArr) {
			return diceArr.reduce((acc, curVal) => acc + curVal, 0);
		}
	},
	{
		name: "Four of a kind",
		condition: "Four of a kind",
		index: 1,
		score(diceArr) {
			return diceArr.reduce((acc, curVal) => acc + curVal, 0);
		}	
	},
	{
		name: "Full house",
		condition: "Three of a kind and a pair",
		index: 2,
		score(diceArr) {
			return 25;
		}
	},
	{
		name: "Small straight",
		condition: "Four of the dice have consecutive values",
		index: 3,
		score(diceArr) {
			return 30;
		}
	},
	{
		name: "Large straight",
		condition: "All five dice have consecutive values",
		index: 4,
		score(diceArr) {
			return 40;
		}
	},
	{
		name: "none",
		condition: "none of the above",
		index: 5,
		score(diceArr) {
			return 0;
		}
	}
];

rulesBtn.addEventListener("click", () => {
	isModalShowing = !isModalShowing;

	if (isModalShowing) {
		rulesContainer.style.display = "block";
		rulesBtn.innerText = "Hide rules";
	} else {
		rulesContainer.style.display = "none";
		rulesBtn.innerText = "Show rules";		
	}
});

const keepScore = () => {
	// Find the checked option
	const checked = Array.from(scoreInputs).find(e => e.checked === true);
	const value = checked.value;
	const id = checked.id;
	updateScore(value, id);

	if (rolls === 3 && round < 6) {
		setTimeout(() => {
			alert(`You have rolled 3 times in round ${round}. \nYour score has been recorded. \nYou are on to the next round!`);
			
			resetInputs();
			rolls = 0;
			round++;
			updateStats();
		}, 10);
	} else {
		rolls = 0;
		round++;
		updateStats();
		resetInputs();
		
		if (round > 6) {
			setTimeout(() => {
					alert(`Your final score is ${score}`);
					resetGame();
				}, 500);
		}
	}
}

const updateStats = () => {
  rollsElement.textContent = rolls;
  if (round > 6) {
	  roundElement.textContent = "6";  	
  } else {
  	roundElement.textContent = round;
  }
};

const rollDice = () => {
	rolls++;
	updateStats();

	resetInputs();
	diceValuesArr = [];
	// console.log("diceValuesArr = " + diceValuesArr);

	// Roll for 5 random number between 1 & 6
	for (let i = 0; i < 5; i++) {
		let number = Math.floor(Math.random() * 6 + 1);
		diceValuesArr.push(number);
	}
	// Populate the dice divs
	for (let i = 0; i < listOfAllDice.length; i++) {
		listOfAllDice[i].textContent = diceValuesArr[i];
	}

	// Scoring logic
	const scoreBoard = {};

	for (num of diceValuesArr) {
		if (scoreBoard[num]) {
			scoreBoard[num] += 1;
		} else {
			scoreBoard[num] = 1;
		}
	}

	const setScore = [... new Set(Object.values(scoreBoard))];
	let index = [5];	// selects rules[5] "none" by default

	// check for 3+ of a kind
	if (setScore.includes(3)) {
		if (setScore.includes(2)) {
			index.push(2);	//	Full house
		} else {
			index.push(0);	// 	Three of a kind
		}
	} else if (setScore.includes(4) || setScore.includes(5)) {
		index.push(1);	//	Four of a kind
	} 

	// check for straights
	const sortedDice = diceValuesArr.sort().join("");
	if (/(1234)|(2345)|(3456)/.test(sortedDice)) {
		index.push(3); 	// 	Small straight
	}
	if (/(12345)|(23456)/.test(sortedDice)) {
		index.push(4);	//	Large straight
	}

	let maxScore = 0;
	let maxIndex = 5;

	// Update the score selection window
	for (i of index) {
		updateRadioOption(i, rules[i].score(diceValuesArr));
		if (rules[i].score(diceValuesArr) > maxScore) {
			maxIndex = i;
		} 
	}

	scoreInputs[maxIndex].checked = true;
	if (rolls === 3) keepScore();
}

// Reset the radio options
const resetInputs = () => {
	for (let i = 0; i < rules.length; i++) { 
		scoreInputs[i].checked = false;
		scoreInputs[i].disabled = true;
		scoreInputs[i].value = score;
		scoreSpans[i].textContent = "";
	}
	return;
}

// Activate check option when rolled
const updateRadioOption = (index, score) => {
	scoreInputs[index].disabled = false;
	scoreInputs[index].value = score;
	scoreSpans[index].textContent = `, score = ${score}`;
}

// value of the radio button = score
// id of the radio button
const updateScore = (value, id) => {
	score += Number(value);
	totalScoreElement.textContent = score;
	scoreHistory.innerHTML += `<li>${id} : ${value}</li>`;
}

function resetGame() {
	diceValuesArr = [];
	// Populate the dice divs
	for (let i = 0; i < listOfAllDice.length; i++) {
		listOfAllDice[i].textContent = diceValuesArr[i];
	}
	score = 0;
	rolls = 0;
	round = 1;
	totalScoreElement.innerText = score;
	scoreHistory.innerHTML = "";
	updateStats();

	// Set the radio buttons to their initial states
	for (const radio of scoreInputs) {
	radio.disabled = true;
	radio.value = radio.id;
	}
	for (const span of scoreSpans) {
	span.textContent = "";
	}
}

keepScoreBtn.addEventListener("click", keepScore);

rollDiceBtn.addEventListener("click", () => {
	rollDice();
	updateStats();
});