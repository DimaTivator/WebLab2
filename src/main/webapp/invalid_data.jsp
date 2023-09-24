<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        body {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>INVALID DATA</h1>
    <br>
    <p> <%= request.getAttribute("error_message") %></p>
    <br>
    <div class="form">
        <form method="get" action="index.jsp">
            <input type="submit" value='Back' >
        </form>
    </div>
</body>
</html>
