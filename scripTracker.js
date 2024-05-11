
function containsOnlyInt(text){
    var intPattern = /^\d+$/;
    return intPattern.test(text);
}

function getDetails(){
    var name=document.getElementById("namebox").value;
    //var data=document.getElementById("databox").value;
    var amount=document.getElementById("amountbox").value;


    var table=document.getElementById("expenses");
    var newRow=document.createElement("tr");

    var nameCell=document.createElement("td");
    nameCell.textContent = name;

    var dataCell=document.createElement("td");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    dataCell.textContent = today;

    var amountCell=document.createElement("td");
    amountCell.textContent = amount + ' ron';

    if(name == ""){
        alert('Please insert where the expense was made!')
        return;
    }else if(containsOnlyInt(name)){
        alert('Please insert a valid name')
        return;
    }else{
        newRow.appendChild(nameCell);
    }

    newRow.appendChild(dataCell);

    if(amount==""){
        alert('Please insert the amount paid')
        return;
    }else if(!containsOnlyInt(amount)){
        alert('Please insert a valid amount')
        return;
    }else{
        newRow.appendChild(amountCell);
    }

    var buton = document.createElement("button");

    buton.textContent = "X";
    
    newRow.appendChild(buton);

    buton.addEventListener("click", function(){
        var expenseId = this.parentNode.id;
    console.log("Expense ID:", expenseId);
    removeExpenseDirrectly(expenseId);
    });

    var totalExpensesRow = document.getElementById('totalExpenses');

    //table.insertBefore(newRow, totalExpensesRow);

    //table.appendChild(newRow);

    updateTotalExpenses();

    // AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "ConnectTracker.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            alert(xhr.responseText);
        }
    };
    var data = "name=" + encodeURIComponent(name) + "&amount=" + encodeURIComponent(amount);
    xhr.send(data);

    setTimeout(function(){
        location.reload();
    }, 300)

}

function removeExpense(expense_id){
    var xhr = new XMLHttpRequest();
        xhr.open('POST', 'deleteExpense.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // If the request is successful, remove the expense row from the table
                var row = document.getElementById('expense_' + expense_id);
                row.parentNode.removeChild(row);
            }
        };
        xhr.send('expense_id=' + expense_id);

        updateTotalExpenses();
}


/*function removeExpenseDirrectly(expenseId) {
    var row = document.getElementById('expense_' + expenseId);
    if (row) {
        row.remove(); // Remove the row directly
        updateTotalExpenses(); // Update total expenses after removal
        // Optionally, you can also make an AJAX call to delete the expense from the server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'deleteExpense.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText); // Log server response
            }
        };
        xhr.send('expense_id=' + expenseId);
    }
}*/


function updateTotalExpenses() {
    var totalAmount = 0;
    var expenseRows = document.querySelectorAll('.expenses tr:not(#totalExpenses)');
    expenseRows.forEach(function(row) {
        // Extract the numeric part of the string and add it to the total amount
        var amountText = row.cells[2].textContent;
        var amountValue = parseFloat(amountText.substring(0, amountText.length - 4)); // Remove " ron" from the end
        totalAmount += amountValue;
    });
    document.getElementById('totalAmount').textContent = "Total Expenses: " + totalAmount.toFixed(2) + " ron";
}

