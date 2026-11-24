const expenses = [];

document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("categories").value;

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Enter valid details!");
        return;
    }

    expenses.push({name, amount, category});
    document.getElementById("expenseForm").reset();
    showExpenses();
});

function showExpenses() {
    const list = document.getElementById("expenseList");
    const filter = document.getElementById("filter").value;
    let total = 0;

    list.innerHTML = "";

    expenses.forEach(function(expense, index) {
        total += expense.amount;

        if (filter === "All" || filter === expense.category) {
            const li = document.createElement("li");
            li.textContent = expense.name + " - ₹" + expense.amount + " - " + expense.category + " ";

            const btn = document.createElement("button");
            btn.textContent = "Delete";

            btn.onclick = function() {
                expenses.splice(index, 1);
                showExpenses();
            };

            li.appendChild(btn);
            list.appendChild(li);
        }
    });

    document.getElementById("total").innerText = total.toFixed(2);
}
