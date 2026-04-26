var player;
var isMoving = false;
var background = new Image();
background.src = "img/3.0/game/home_background.png";
let messageBox = document.getElementById("messageBox");
let chatbox = document.getElementById("chatbox");

//helper function for getting cookies
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let username = getCookie("username");

function startGame() {
    player = new component(30, 30, "red", 405, 305);
    usernameDisplay = new component("12px", "monospace", "#0000BC", player.x + (player.width / 2), player.y + 45, "text");
    chatBubble = new component(97, 46, "img/3.0/game/chat_bubble.png", 372, 255, "image")
    chatText = new component("12px", "monospace", "#000000", chatBubble.x, chatBubble.y, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 780;
        this.canvas.height = 580;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.addEventListener("click", function(event) {
            let x = event.offsetX;
            let y = event.offsetY;

            player.updateGoal(x - (player.width / 2), y - (player.height / 2));
            isMoving = true;
        });
        usernameDisplay.text = username;
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 16.66);
    },
    clear: function () {
        this.context = this.canvas.getContext("2d");
        this.context.drawImage(background, 0, 0);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.goalX = this.x;
    this.goalY = this.y;
    this.playerSpeed = 2;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.updateGoal = function (newX, newY) {
        this.goalX = newX;
        this.goalY = newY;
    }
    this.movePlayer = function () {
        const dx = this.goalX - this.x;
        const dy = this.goalY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.playerSpeed) {
            this.x += (dx / distance) * this.playerSpeed;
            this.y += (dy / distance) * this.playerSpeed;
        }
        else {
            isMoving = false;
            this.x = this.goalX;
            this.y = this.goalY;
        }
    }
    this.updateUsernamePos = function () {
        usernameDisplay.x = player.x + (player.width / 2);
        usernameDisplay.y = player.y + 45;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    usernameDisplay.update();
    if (isMoving === true) {
        player.movePlayer();
        usernameDisplay.updateUsernamePos();
    }
    player.update();
    chatBubble.update();
}

function sendMessage() {
    let messageText = messageBox.value;

    const message = document.createElement("p");
    message.textContent = messageText;
    chatText.text = messageText;
    chatbox.appendChild(message);
}