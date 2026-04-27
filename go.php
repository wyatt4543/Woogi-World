<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Woogi World - Play</title>
    <style>
    canvas {
        border:1px solid #d3d3d3;
        background-color: #f1f1f1;
    }
    </style>
</head>
<body onload="startGame()">
    <script type="text/javascript" async="" src="go.js"></script>
    <div id="messageContainer">
        <input type="text" id="messageBox" name="messageBox" onkeypress="return checkForEnter(event)">
        <button onclick="sendMessage()">Send</button>
    </div>
    <div id="chatbox"></div>
</body>
</html>