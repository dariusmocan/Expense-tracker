
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

    
    buton.style.width="100%";
    buton.style.height="100%";
    buton.style.padding="0";
    buton.style.margin="0";
    buton.style.textAlign="center";
    buton.style.display = "flex";
    buton.style.alignItems = "center";
    buton.style.justifyContent = "center";

    buton.textContent = "X";
    buton.addEventListener("click", function(){
        var row = this.parentNode;
        row.parentNode.removeChild(row);
    })
    newRow.appendChild(buton);

    table.appendChild(newRow);


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

}
