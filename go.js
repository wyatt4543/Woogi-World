var player;
var isMoving = false;
var showChatBubble = false;
var background = new Image();
background.src = "img/3.0/game/home_background.png";
let messageBox = document.getElementById("messageBox");
let chatbox = document.getElementById("chatbox");

//HELPER FUNCTIONS
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

//helper function for waiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function startGame() {
    player = new component(30, 30, "red", 405, 305);
    usernameDisplay = new component("12px", "monospace", "#0000BC", player.x + (player.width / 2), (player.y + (player.height / 2)) + 30, "text", player);
    chatBubble = new component(97, 46, "img/3.0/game/small_chat_bubble.png", (player.x + (player.width / 2)) - 48, (player.y + (player.height / 2)) - 65, "image", player)
    chatText = new component("12px", "monospace", "#000000", chatBubble.x + (chatBubble.width / 2), (chatBubble.y + (chatBubble.height / 2)) - 5, "text", chatBubble);
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

function component(width, height, color, x, y, type, parent) {
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
            this.updatePosition(this.x + (dx / distance) * this.playerSpeed, this.y + (dy / distance) * this.playerSpeed)
        }
        else {
            isMoving = false;
            this.updatePosition(this.goalX, this.goalY);
        }
    }
    this.updatePosition = function (newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    this.childUpdatePosition = function (addX, addY) {
        this.updatePosition((parent.x + (parent.width / 2)) + addX, (parent.y + (parent.height / 2)) + addY);
    }
    this.updateImage = function (newImage) {
        this.image.src = newImage;
        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (isMoving === true) {
        player.movePlayer();
        usernameDisplay.childUpdatePosition(0, 30);
        chatBubble.childUpdatePosition(-48, -65);
        chatText.childUpdatePosition(0, -5);
    }
    player.update();
    usernameDisplay.update();
    if (showChatBubble === true) {
        chatBubble.update();
        chatText.update();
    }
}

function sendMessage() {
    let messageText = messageBox.value;
    if (messageText.length <= 13) {
        chatBubble.updateImage("img/3.0/game/small_chat_bubble.png");
    } else {
        chatBubble.updateImage("img/3.0/game/medium_chat_bubble.png");
    }

    const message = document.createElement("p");
    message.textContent = messageText;
    chatText.text = messageText;
    chatbox.appendChild(message);
    messageBox.value = "";
    chatTimeOut();
}

async function chatTimeOut() {
    // allow the chat message to show
    showChatBubble = true;

    // hide the chat message after 3 seconds
    await sleep(3000);
    showChatBubble = false;
}

// check for if the user hit the enter key for the chatBox
function checkForEnter(e) {
    if (e.keyCode === 13) {
        return sendMessage();
    }
}