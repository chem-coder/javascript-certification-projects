const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const outputDiv = document.getElementById("output-div");

checkBtn.addEventListener("click", check);
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") check();
});

clearBtn.addEventListener("click", clear);

function check() {
	if (!input.value) {
		alert("Please provide a phone number");
		return;
	}

	const regex = new RegExp(/^[1]?[- ]?(?:\d{3}|\(\d{3}\))[- ]?(\d{3})[- ]?(\d{4})$/, "i");	// lookbehinds are not supported in JavaScript
	const str = input.value.toString();

	result.innerText = regex.test(str) ?
		`Valid US number: ${input.value}` :	
		`Invalid US number: ${input.value}`;
	outputDiv.style.display = "block";

	return result.innerText;
}

function clear() {
	result.innerText = "";
	input.value = "";
	// Hide the div
	outputDiv.style.display = "none";
}