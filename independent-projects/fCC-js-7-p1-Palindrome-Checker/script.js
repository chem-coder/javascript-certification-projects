// when the button is clicked
const button = document.querySelector("#check-btn");
button.onclick = palindromeChecker;		//	function reference

// when the user presses Enter
document.getElementById("text-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
    	palindromeChecker();		// function call
    }
});

function palindromeChecker() {
	let inputValue = document.getElementById("text-input").value;
	let result;
  	let output = document.querySelector("#result");


	if (inputValue === "") {
		alert("Please input a value");
		return;
	}

	let workStr = inputValue.toLowerCase().split("").filter(c => (/[a-z0-9]/g).test(c));
  	// Check
  	let sliceIndex = Math.floor(workStr.length / 2 );
  	let frontHalf = workStr.slice(0, sliceIndex);
  	let secondHalfRev = workStr.slice(workStr.length - sliceIndex).reverse();
  	
  	if (frontHalf.every((val, index) => val === secondHalfRev[index])) {
  		result = `${inputValue} is a palindrome.`;
  	} else {
  		result = `${inputValue} is not a palindrome.`;
  	}
	output.innerHTML = `<p>${result}</p>`;
}