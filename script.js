//var startingBudget = prompt("Please enter your starting budget.", "0.00");

// document.getElementById("remainingBudget").innerHTML = startingBudget
// document.getElementById("startingBudget").innerHTML = startingBudget;

document.getElementById("remainingBudget").innerHTML = 500;
document.getElementById("startingBudget").innerHTML = 100;


function budgetSubtract(expenseAmount) {
  let remainingBudget = document.getElementById("remainingBudget");
  let updatedTotal = parseFloat(remainingBudget.innerHTML) - expenseAmount;
  remainingBudget.innerHTML = updatedTotal;
}

function totalExpenses(expenseAmount) {
  let totalcash =  document.getElementById("totalcash");
  let totalAmount = parseFloat(totalcash.innerHTML) + expenseAmount;
  totalcash.innerHTML = totalAmount;
}

function addToCategory(category, amount) {
  let entcash = document.getElementById("entcash").innerHTML;
  let foodcash = document.getElementById("foodcash").innerHTML;
  let clothcash = document.getElementById("clothcash").innerHTML;
  let billcash = document.getElementById("billcash").innerHTML;

  entcash = parseFloat(entcash);
  foodcash = parseFloat(foodcash);
  clothcash = parseFloat(clothcash);
  billcash = parseFloat(billcash);

  if(category === 'entertainment') {
    let newent = entcash + amount;
    document.getElementById("entcash").innerHTML = newent;
  } else if (category === 'food') {
    let newfood = foodcash + amount;
    document.getElementById("foodcash").innerHTML = newfood;
  } else if (category === 'clothing') {
    let newcloth = clothcash + amount;
    document.getElementById("clothcash").innerHTML = newcloth;
  } else if (category === 'bills') {
    let newbill = billcash + amount;
    document.getElementById("billcash").innerHTML = newbill;
  }
}

function overdraft() {
  let remainingBudget = document.getElementById("remainingBudget");
  let remainingBudgetAmount = parseInt(remainingBudget.innerHTML);
  if(remainingBudgetAmount <= 0) {
    alert("Cannot purchase additional items.");
    document.getElementById('expense-submit').setAttribute("disabled", true);
    // remainingBudget.classList.add("over"); -Is this right?SS
  }
}

function logExpense(expenseObj){
  const newDataRow = document.createElement("tr");
  const descriptionCell = document.createElement("td");
  descriptionCell.textContent = expenseObj.description;
  newDataRow.appendChild(descriptionCell);
  const categoryCell = document.createElement("td");
  categoryCell.textContent = expenseObj.category;
  newDataRow.appendChild(categoryCell);
  const amountCell = document.createElement('td');
  amountCell.textContent = "$" + expenseObj.amount;
  newDataRow.appendChild(amountCell);
  document.getElementById("expenseTable").appendChild(newDataRow);
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
})