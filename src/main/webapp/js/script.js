document.addEventListener('DOMContentLoaded', function() {
    updateTable();
});


function checkAndSendData(mouse, mouseX, mouseY) {

    let isValid = true;
    let xInput;
    let yInput;

    let selectedR = null;
    const radioButtons = document.getElementsByName("r_button");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedR = radioButtons[i].value;
            break;
        }
    }

    if (selectedR == null) {
        isValid = false;
        alert("Choose R");
    }

    if (!mouse) {

        xInput = parseFloat(document.getElementById("X_input_text_field").value);

        yInput = parseFloat(document.getElementById("Y_input_text_field").value);

        // X validation
        if (isNaN(xInput) || xInput > 5 || xInput < -3) {
            isValid = false;
            alert("X must be from -3 to 5");
        }

        // Y validation
        if (isNaN(yInput) || yInput > 3 || yInput < -5) {
            isValid = false;
            alert("Y must be from -5 to 3");
        }
    }

    if (isValid) {

        if (mouse) {
            xInput = mouseX;
            yInput = mouseY;
        }

        let input_data = new FormData();
        input_data.append('x', xInput.toString());
        input_data.append('y', yInput.toString());
        input_data.append('r', selectedR);

        const url = `control?x=${xInput}&y=${yInput}&r=${selectedR}`;
        console.log("xInput" + xInput)
        console.log("yInput" + yInput)
        console.log("selectedR" + selectedR)
        //const url = `http://localhost:8080/WebLab2-1.0-SNAPSHOT/control?x=${xInput}&y=${yInput}&r=${selectedR}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error' + response.status);
                }
                return response.text();
            })
            .then(data => {
                // let resultTable = localStorage.getItem("resultTable");
                //
                // if (resultTable == null) {
                //     localStorage.setItem("resultTable", data);
                //
                // } else {
                //     let rows = resultTable.split(",");
                //     rows.push(data);
                //     localStorage.setItem("resultTable", rows.join(","));
                // }
                //
                // updateTable();
                //
                // console.log('Server response: ' + data);

                console.log("SUCCESS!!!!!!!")
            })
            .catch(error => {
                alert(error);
            });
    }
}

function updateTable() {
    clearTable();

    let resultTable = document.getElementById("result-table");
    let tableStorage = localStorage.getItem("resultTable");

    if (tableStorage){
        let rows = tableStorage.split(",");
        rows.forEach(row => resultTable.insertAdjacentHTML('beforeend', row));
    }
}

function clearTable() {
    let resultTable = document.getElementById('result-table')

    while (resultTable.rows.length > 1) {
        resultTable.deleteRow(1);
    }
}

function removeTable() {
    localStorage.removeItem("resultTable");
    clearTable();
}
