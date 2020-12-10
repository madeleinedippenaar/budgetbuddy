var startingBudget = prompt("Please enter your starting budget.", "0.00");

document.getElementById("startingBudget").innerHTML = startingBudget;
document.getElementById("remainingBudget").innerHTML = startingBudget;

let remainingBudget = document.getElementById("remainingBudget");

const expenseForm = document.getElementById("expenseForm");

function budgetSubtract(remainingBudget, expenseAmount) {
  let updatedTotal = remainingBudget - expenseAmount;
  document.getElementById("remainingBudget").innerHTML = updatedTotal;
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseData = new FormData(e.target);
  const selectType = document.getElementById("expenseType");
  const amount = parseFloat(expenseData.get("expenseAmount"));

  const expenseOrder = {
    description: expenseData.get("expenseDescription"),
    category: selectType.value,
    amount: amount,
  };

  budgetSubtract(remainingBudget, expenseOrder.amount);
});
