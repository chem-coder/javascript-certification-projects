const inputVal = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");

const refArr = [
	{ arabic: 1000, roman: "M" },
	{ arabic: 900, roman: "CM" },
	{ arabic: 500, roman: "D" },
	{ arabic: 400, roman: "CD" },
	{ arabic: 100, roman: "C" },
	{ arabic: 90, roman: "XC" },
	{ arabic: 50, roman: "L" },
	{ arabic: 40, roman: "XL" },
	{ arabic: 10, roman: "X" },
	{ arabic: 9, roman: "IX" },
	{ arabic: 5, roman: "V" },
	{ arabic: 4, roman: "IV" },
	{ arabic: 1, roman: "I" }
];

convertBtn.addEventListener("click", checkUserInput);
inputVal.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		checkUserInput();
	}
});

let converted = [];

function checkUserInput() {

	const inputInt = parseInt(inputVal.value);

	if (isNaN(inputInt)) {
		showMessage("Please enter a valid number");
		return;
	} else if (inputInt < 1) {
		showMessage("Please enter a number greater than or equal to 1");
		return;
	} else if (inputInt > 3999) {
		showMessage("Please enter a number less than or equal to 3999");
		return;
	}

	convertNumber(inputInt, 0);
	showMessage(`You entered <span><strong>${inputVal.value}</strong></span></br>The result is <span><strong>${converted.join('')}</strong></span>`);
	converted = [];
	return;
}

function convertNumber(dividend, index) {
	if (dividend <= 0) {
		return;
	} else {
		const divisor = refArr[index].arabic;
		const quotient = Math.floor(dividend / divisor);

		for (let i = 0; i < quotient; i++) {
			converted.push(refArr[index].roman);
		}

		const remainder = dividend % divisor;
		convertNumber(remainder, index + 1);
	}
	return;
}

function showMessage(msg) {
	result.innerHTML = `<p>${msg}</p>`;
}