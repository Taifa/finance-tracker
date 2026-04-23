const expenseName = document.getElementById("ename");
const expensePrice = document.getElementById("eprice");
const expenseAdd = document.getElementById("eadd");
const expenseInput = document.getElementById("exp-input");
const dropDown = document.getElementById("dropdown");
const dropFilter = document.getElementById("filter");
let exArr = [];

expenseAdd.addEventListener("click", function () {
  if (expenseName.value == "" || expensePrice.value == "") return;

  const expense = {
    name: expenseName.value,
    price: parseFloat(expensePrice.value),
    category: dropDown.value,
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
  getVisibleExpenses().forEach((expense, i) => {
    const filterValue = dropFilter.value;
    if (filterValue != "All" && expense.category != filterValue) {
      return;
    } else {
      const li = document.createElement("li");
      const name = document.createElement("span");
      const text = document.createElement("span");
      const text2 = document.createElement("span");
      const price = document.createElement("span");
      const category = document.createElement("span");

      const button = document.createElement("button");
      button.className = "delete-btn";
      button.textContent = "Delete";
      button.addEventListener("click", function () {
        exArr.splice(i, 1);
        updateUI();
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        const currentExpense = exArr[i];
        const newName = prompt(
          "What is the expense's new name?",
          currentExpense.name,
        );
        const newPrice = prompt(
          "What is the expense's new price?",
          currentExpense.price,
        );
        const newCategory = prompt(
          "What is the expense's new category?",
          currentExpense.category,
        );

        if (newName != null && newName != "") {
          currentExpense.name = newName;
        }
        if (newPrice != null) {
          const parsed = parseFloat(newPrice);
          if (!Number.isNaN(parsed)) {
            currentExpense.price = parseFloat(newPrice);
          }
        }
        if (newCategory != null && newCategory != "") {
          currentExpense.category = newCategory;
        }
        updateUI();
      });

      dropFilter.addEventListener("change", function () {
        updateUI();
      });

      name.textContent = expense.name;
      text.textContent = ") : ";
      price.textContent = expense.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      category.textContent = expense.category;
      text2.textContent = " (";
      const leftDiv = document.createElement("div");
      leftDiv.className = "left-div";
      leftDiv.appendChild(name);
      leftDiv.appendChild(text2);
      leftDiv.appendChild(category);
      leftDiv.appendChild(text);

      const rightDiv = document.createElement("div");
      rightDiv.className = "right-div";
      rightDiv.appendChild(price);
      rightDiv.appendChild(editButton);
      rightDiv.appendChild(button);

      li.appendChild(leftDiv);
      li.appendChild(rightDiv);

      expenseList.appendChild(li);
    }
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

  getVisibleExpenses().forEach((expense, i) => {
    total += expense.price;
  });
  tAmount.textContent = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const getVisibleExpenses = () => {
  if (dropFilter.value === "All") {
    return exArr;
  } else {
    let result = [];

    exArr.forEach((expense, i) => {
      if (expense.category === dropFilter.value) {
        result.push(expense);
      }
    });
    return result;
  }
};
const updateUI = () => {
  renderExpenses();
  expenseTotal();
  saveExpenses();
};
loadExpenses();
updateUI();
