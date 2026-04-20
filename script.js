const expenseName = document.getElementById("ename");
const expensePrice = document.getElementById("eprice");
const expenseAdd = document.getElementById("eadd");
const expenseInput = document.getElementById("exp-input");
let exArr = [];

expenseAdd.addEventListener("click", function () {
  if (expenseName.value == "" || expensePrice.value == "") return;

  const expense = {
    name: expenseName.value,
    price: parseFloat(expensePrice.value),
  };

  exArr.push(expense);
  updateUI();
  expenseInput.reset();
});

const saveExpenses = () => {
  let stringExpenses = JSON.stringify(exArr);
  localStorage.setItem("expenses", stringExpenses);
};

const loadExpenses = () => {
  let savedStorage = localStorage.getItem("expenses");
  if (savedStorage != null) {
    exArr = JSON.parse(savedStorage);
  }
};
const renderExpenses = () => {
  const expenseList = document.getElementById("exp-list");
  expenseList.innerHTML = "";
  exArr.forEach((expense, i) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    const text = document.createElement("span");
    const price = document.createElement("span");

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click", function () {
      exArr.splice(i, 1);
      updateUI();
    });

    name.textContent = expense.name;
    text.textContent = ": ";
    price.textContent = expense.price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    li.appendChild(name);
    li.appendChild(text);
    li.appendChild(price);
    li.appendChild(button);
    expenseList.appendChild(li);
  });
};

const expenseTotal = () => {
  const expenseTotal = document.getElementById("exp-total");
  let total = 0;

  expenseTotal.innerHTML = "";
  const tHeader = document.createElement("h3");
  const tText = document.createElement("span");
  const tColon = document.createElement("span");
  const tAmount = document.createElement("span");
  tText.textContent = "Total";
  tColon.textContent = ": ";
  tHeader.appendChild(tText);
  tHeader.appendChild(tColon);
  tHeader.appendChild(tAmount);
  expenseTotal.appendChild(tHeader);

  exArr.forEach((expense, i) => {
    total += expense.price;
  });
  tAmount.textContent = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
const updateUI = () => {
  renderExpenses();
  expenseTotal();
  saveExpenses();
};
loadExpenses();
updateUI();
