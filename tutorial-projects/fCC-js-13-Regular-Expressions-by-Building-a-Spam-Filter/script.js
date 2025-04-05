const messageInput = document.getElementById("message-input");
const result = document.getElementById("result");
const checkMessageButton = document.getElementById("check-message-btn");

const helpRegex = /please help|assist me/i;
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;
const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i1|][e3]nd(?:\s|$)/i;

const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

const checkMessage = () => {
  if (messageInput.value === "") {
    alert("Please enter a message.");
    return;
  }

  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message."
    : "This message does not seem to contain any spam.";
  messageInput.value = "";
};

// Click event for the button
checkMessageButton.addEventListener("click", checkMessage);

// Enter key event for the input field
messageInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();	// Prevents line breaks in text inputs
		checkMessage();
	}
});


// /i ignore case flag
// /g global flag
//
//	string.match(regex)
//  regex.test(string)
//
//	[] character class - is defined by square brackets, and matches any character within the brackets.
//	[iaeou] or [0-9]
//
//	+ quantifier - matches 1 or more consecutive occurrences, "match the previous character at least one time".
//	* quantifier - matches 0 or more consecutive occurrences, "match the previous character 0 or more times".
//	? quantifier - matches 0 or 1 occurrence of the preceding character or group
//	/colou?r/ matches both color and colour, because the u is optional.
//
//	| token - either or
//	() capture group - define a part of the expression that should be captured and saved for later reference
//	/h(i|ey) camper/
//
// ?: non-capturing group
// (?:a|b) will match either a or b, but it will not capture the result
//
//	\s will match spaces, tabs, and line breaks.
//	^ anchor - match the beginning of the text
//	$ anchor - match the end of the string.