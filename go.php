<?php
session_start();
echo "username: {$_SESSION['username']}";
setcookie("username", $_SESSION['username'], time() + (86400 * 30), "/", "", false, false);
?>


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
</body>
</html>