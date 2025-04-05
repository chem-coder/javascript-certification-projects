let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let price = 3.24;

const penniesAmount = document.getElementById("pennies-amount");
const nickelsAmount = document.getElementById("nickels-amount");
const dimesAmount = document.getElementById("dimes-amount");
const quartersAmount =  document.getElementById("quarters-amount");
const onesAmount = document.getElementById("ones-amount");
const fivesAmount = document.getElementById("fives-amount");
const tensAmount = document.getElementById("tens-amount");
const twentiesAmount = document.getElementById("twenties-amount");
const hundredsAmount = document.getElementById("hundreds-amount");

const priceElement = document.getElementById("price");
const given = document.getElementById('you-gave');
const registerTotal = document.getElementById("register-total");
const cashInput = document.getElementById("cash"); // user input amount
const changeDueElement = document.getElementById("change-due");
const changeDueElementLine = document.getElementById("change-due-line");
const purchaseBtn = document.getElementById("purchase-btn");

const updatePage = () => {
  penniesAmount.innerText = cid[0][1];
  nickelsAmount.innerText = cid[1][1];
  dimesAmount.innerText = cid[2][1];
  quartersAmount.innerText = cid[3][1];
  onesAmount.innerText = cid[4][1];
  fivesAmount.innerText = cid[5][1];
  tensAmount.innerText = cid[6][1];
  twentiesAmount.innerText = cid[7][1];
  hundredsAmount.innerText = cid[8][1];
  priceElement.innerText = price;
  cashInput.value = "";
  registerTotal.innerHTML = `TOTAL in the register: $${cid.reduce((acc, el) => el[1] + acc, 0).toFixed(2)}<br>`;
}

const calculate = (changeDue, cid, changeToReturn) => {
  let currency = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100];  // what each bill & coin is worth
  let workingCid = cid.map(el => [el[0], el[1]]);
  let workingChangeToReturn = changeToReturn.map(el => [el[0], 0]);

  for (let i = currency.length - 1; i >= 0; i--) {
    while (changeDue >= currency[i] && workingCid[i][1] > 0) {
      changeDue = Math.round((changeDue - currency[i]) * 100) / 100;
      workingCid[i][1] = Math.round((workingCid[i][1] - currency[i]) * 100) / 100;
      workingChangeToReturn[i][1] += currency[i];
    }
  }

  let status = "undetermined yet";
  if (changeDue < 0.01 && workingCid.every(el => el[1] < 0.01)) {
    status = "CLOSED";
  } else if (changeDue < 0.01) {
    status = "OPEN";
  } else if (changeDue > 0.01) {
    status = "INSUFFICIENT_FUNDS";
  }

  return [status, workingChangeToReturn, workingCid];
}


const getChange = (changeDue, cid) => {
  const changeToReturn = cid.map(el => [el[0], 0]);   // output array will be similar to the cid array

  // Call another function to perform the calculation & decide on status
  const [status, updatedChangeToReturn, updatedCid] = calculate(changeDue, cid, changeToReturn);
  // Based on status, return results
  if (status === "OPEN" || status === "CLOSED") {
    return [status, updatedChangeToReturn, updatedCid];
  } else {
    return [status, changeToReturn, cid];
  }
}


const purchase = () => {
  // Calculate  Change Due
  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashInput.value - price === 0) {
    changeDueElement.innerHTML = "No change due - customer paid with exact cash";
    changeDueElement.classList.replace("hide", "show");
    changeDueElementLine.classList.replace("hide", "show");
    return;
  }
  given.innerHTML = "You gave $" + cashInput.value;
  const changeDue = parseFloat(cashInput.value) - price;
  changeDueElement.innerHTML = "Change due: $" + changeDue.toFixed(2) + "<br><br>";

  // Get change
  const [finalStatus, finalChangeToReturn, finalCid] = getChange(changeDue, cid);
  cid = finalCid;
  changeDueElement.innerHTML += `Status: ${finalStatus}<br>`;
  finalChangeToReturn
    .filter(el => el[1] !== 0)
    .map(el => {
    changeDueElement.innerHTML += `${el[0]}: $${el[1].toFixed(2)}<br>`;
  });

  // Update values & page design
  updatePage();
  changeDueElement.classList.replace("hide", "show");
  changeDueElementLine.classList.replace("hide", "show");
}


window.onload = function () {
  updatePage();
}

purchaseBtn.addEventListener("click", () => purchase());
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") purchase();
});


// running tests
// 7. When price is 20 and the value in the #cash element is 10, an alert should appear with the text "Customer does not have enough money to purchase the item".
// 8. When the value in the #cash element is less than price, an alert should appear with the text "Customer does not have enough money to purchase the item".
// 9. When price is 11.95 and the value in the #cash element is 11.95, the value in the #change-due element should be "No change due - customer paid with exact cash".
// 10. When the value in the #cash element is equal to price, the value in the #change-due element should be "No change due - customer paid with exact cash".
// 14. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
// 15. When the price is less than the value in the #cash element and the total cash in the drawer (cid) is insufficient to cover the change due, the purchase should not proceed. When the #purchase-btn is clicked under these conditions, the #change-due element should display "Status: INSUFFICIENT_FUNDS".
// 16. When price is 19.5, the value in the #cash element is 20, cid is [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]], and the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS".
// 17. When price is less than the value in the #cash element, total cash in drawer cid is greater than change due, but the individual denomination amounts make it impossible to return needed change, when the #purchase-btn element is clicked, the value in the #change-due element should be "Status: INSUFFICIENT_FUNDS"
// tests completed