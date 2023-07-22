import Action from "./Classes/Action.js";
import ActionManager from "./Classes/ActionManager.js";

let actionManager = new ActionManager();

if (localStorage.getItem("myActions") != null) {
    actionManager.actions = JSON.parse(localStorage.getItem("myActions")).actions;
    showActionsInTable();
}

function showActionsInTable() {
    actionManager.calcBalance();
    document.getElementById("tableBody").innerHTML = "";
    for (let action of actionManager.actions) {
        tableBody.innerHTML += `
        <tr class="${action.type == "income" ? "text-success" : "text-danger"}">
        <td>${action.description}</td>
        <td>${action.amount}</td>
        <td>${action.date}</td>
        <td class="text-end"><i class="fa-regular fa-pen-to-square" onclick="edit(${action.id})"></i></td>
        <td class="text-center"><i class="fa-regular fa-trash-can" onclick="remove(${action.id})"></i></td>
        </tr>`;
    }
}

window.addNewAction = () => {
    let selectValue = document.getElementById("selectForm").value;
    let descriptionValue = document.getElementById("descriptionForm").value;
    let dateValue = document.getElementById("dateForm").value;
    let amountValue = +document.getElementById("amountForm").value;
    if (selectValue == "" || descriptionValue == "" || dateValue == "" || amountValue == "") {
        alert("You must fill all the fields!");
    }
    else {
        actionManager.addAction(new Action(selectValue, descriptionValue, amountValue, dateValue));
        localStorage.setItem("myActions", JSON.stringify(actionManager));
        document.getElementById("selectForm").value = "income";
        document.getElementById("descriptionForm").value = "";
        document.getElementById("dateForm").value = "";
        document.getElementById("amountForm").value = "";
        showActionsInTable();
    }
}

window.edit = (id) => {
    let newAmount = prompt("Enter new amount: ");
    if (Number(newAmount != NaN) && Number(newAmount) > 0) {
        actionManager.updateAction(id, Number(newAmount));
        localStorage.setItem("myActions", JSON.stringify(actionManager));
        showActionsInTable();
    }
    else alert("Amount is not valid!");
}

window.remove = (id) => {
    if (confirm("Are you sure?")) {
        actionManager.deleteAction(id);
        localStorage.setItem("myActions", JSON.stringify(actionManager));
        showActionsInTable();
    }
}



