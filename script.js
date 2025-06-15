let transactions = [];

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const addbtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

addbtn.addEventListener("click", ()=>{
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value)
    const date = dateInput.value;

    if (!title || !amount || !date || amount <= 0) {
    alert("Please enter valid details!");
    return;
  }
  const transaction = {
    id: Date.now(), // unique ID
    title,
    amount,
    date
  };

  transactions.push(transaction)
  saveToLocal();

  renderList();
  updateTotal();

  // Clear inputs
  titleInput.value = "";
  amountInput.value = "";
  dateInput.value = "";

})

function renderList(){
    expenseList.innerHTML = "";

    transactions.forEach((txn)=>{
        const li = document.createElement("li");
        li.innerHTML = `${txn.title} - ${txn.amount} (${txn.date})`;
        

        const delBtn = document.createElement("button");
        delBtn.innerText = "🗑";
        delBtn.classList.add("delete-btn");
        delBtn.addEventListener("click", () => {
        deleteTransaction(txn.id);

        })
        li.appendChild(delBtn);
        expenseList.appendChild(li);
    })
}

function updateTotal() {
    const total = transactions.reduce((sum ,txn)=> sum + txn.amount,0);
    totalDisplay.innerText = total.toFixed(2);
}

function deleteTransaction(id){
    transactions = transactions.filter((txn) => txn.id !== id);
    saveToLocal();
    renderList();
    updateTotal();
}

function saveToLocal() {
  localStorage.setItem("expenseData", JSON.stringify(transactions));
}

const saved = localStorage.getItem("expenseData");
if (saved) {
  transactions = JSON.parse(saved);
  renderList();
  updateTotal();
}

