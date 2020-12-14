var startingBudget = 0.0;

startingBudget = prompt("Please enter your starting budget.", "0.00");

startingBudget = parseFloat(startingBudget).toFixed(2).toString();

document.getElementById("remainingBudget").innerHTML = startingBudget;
document.getElementById("startingBudget").innerHTML = startingBudget;

function budgetSubtract(expenseAmount) {
  let remainingBudget = document.getElementById("remainingBudget");
  let totalAmount = parseFloat(remainingBudget.innerHTML) - expenseAmount;
  remainingBudget.innerHTML = parseFloat(totalAmount).toFixed(2);
}

function totalExpenses(expenseAmount) {
  let totalcash = document.getElementById("totalcash");
  let totalAmount = parseFloat(totalcash.innerHTML) + expenseAmount;
  totalcash.innerHTML = parseFloat(totalAmount).toFixed(2);
}

function addToCategory(category, amount) {
  if (category === "entertainment") {
    let entcash = document.getElementById("entcash");
    let newent = parseFloat(entcash.innerHTML) + amount;
    entcash.innerHTML = parseFloat(newent).toFixed(2);
  } else if (category === "food") {
    let foodcash = document.getElementById("foodcash");
    let newfood = parseFloat(foodcash.innerHTML) + amount;
    foodcash.innerHTML = parseFloat(newfood).toFixed(2);
  } else if (category === "clothing") {
    let clothcash = document.getElementById("clothcash");
    let newcloth = parseFloat(clothcash.innerHTML) + amount;
    clothcash.innerHTML = parseFloat(newcloth).toFixed(2);
  } else if (category === "bills") {
    let billcash = document.getElementById("billcash");
    let newbill = parseFloat(billcash.innerHTML) + amount;
    billcash.innerHTML = parseFloat(newbill).toFixed(2);
  }
}

function logExpense(expenseObj) {
  const newDataRow = document.createElement("tr");

  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = expenseObj.description;
  newDataRow.appendChild(descriptionCell);

  const categoryCell = document.createElement("td");
  categoryCell.textContent = expenseObj.category;
  newDataRow.appendChild(categoryCell);

  const amountCell = document.createElement("td");
  amountCell.textContent = "$" + expenseObj.amount;
  newDataRow.appendChild(amountCell);

  document.getElementById("expenseTable").appendChild(newDataRow);
}

function overdraft() {
  let remainingBudget = document.getElementById("remainingBudget");
  let remainingBudgetAmount = parseInt(remainingBudget.innerHTML);
  let remainingDollars = document.getElementById("remainingDollars");

  if (remainingBudgetAmount <= 0) {
    alert("Cannot purchase additional items.");
    document.getElementById("expense-submit").setAttribute("disabled", true);
    remainingDollars.classList.add("over");
    remainingDollars.innerText = "-$" + remainingBudget.innerHTML.slice(1);
  }

  if (remainingBudgetAmount == 0.0) {
    remainingDollars.innerText = "$0.00";
  }
}

const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseData = new FormData(e.target);
  const selectType = document.getElementById("expenseType");
  const amount = parseFloat(expenseData.get("expenseAmount"));

  const expenseObj = {
    description: expenseData.get("expenseDescription"),
    category: selectType.value,
    amount: amount,
  };

  budgetSubtract(expenseObj.amount);

  addToCategory(expenseObj.category, expenseObj.amount);

  totalExpenses(expenseObj.amount);

  logExpense(expenseObj);

  overdraft();
});
