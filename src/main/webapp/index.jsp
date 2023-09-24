<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Web Lab1</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/result_table.css">
    <script src="js/script.js"></script>
    <script src="js/chart.js"></script>
    <!-- <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> -->
</head>
<body>
<div id="container">
    <div id="header">
        <h2>Андриянов Дмитрий Викторович, P3212, Вариант 2200</h2>
    </div>

    <div class="input-container">
        <div id="x-input" class="input-block">
            <b>Enter X</b><br>
            <div class="val-input">
                <input type="number" id="X_input_text_field" name="X_input_text_field" min="-3" max="5" step="0.1" placeholder="from -3 to 5">
                <label for="X_input_text_field"></label>
            </div>
        </div>

        <div id="y-input" class="input-block">
            <b>Enter Y</b><br>
            <div class="val-input">
                <input type="number" id="Y_input_text_field" name="Y_input_text_field" min="-5" max="3" step="0.1" placeholder="from -5 to 3">
                <label for="Y_input_text_field"></label>
            </div>
        </div>

        <div id="r-input" class="input-block">
            <b>Choose R</b><br>
            <div class="r-val-input">
                <p><label>
                    <input name="r_button" value="1" type="radio">
                </label>1</p>
                <p><label>
                    <input name="r_button" value="2" type="radio">
                </label>2</p>
                <p><label>
                    <input name="r_button" value="3" type="radio">
                </label>3</p>
                <p><label>
                    <input name="r_button" value="4" type="radio">
                </label>4</p>
                <p><label>
                    <input name="r_button" value="5" type="radio">
                </label>5</p>
            </div>
        </div>

        <div id="chart-button-container">
            <div id="canvasjs-chart-container">
                <canvas id="chart"></canvas>
            </div>
            <div id="buttons-container">
                <button id="check_button" onclick="checkAndSendData(false, null, null)">Check</button>
                <!-- <button id="clear_button" onclick="removeTable()">Clear</button> -->
            </div>
        </div>
    </div>

    <div class="table-container">
        <jsp:include page="result_table.jsp" />
    </div>

</div>
</body>
</html>