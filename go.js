var player;

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
    player = new component(30, 30, "red", 210, 105);
    usernameDisplay = new component("12px", "monospace", "#0000BC", 210, 150, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.addEventListener("click", function(event) {
            let x = event.offsetX;
            let y = event.offsetY;

            player.updateGoal(x, y);
        });
        usernameDisplay.text = username;
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
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
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.updateGoal = function (newX, newY) {
        this.goalX = newX;
        this.goalY = newY;
        console.log("X sign: " + Math.sign(this.goalX - this.x));
        console.log("Y sign: " + Math.sign(this.goalY - this.y));
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
            this.x = this.goalX;
            this.y = this.goalY;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    usernameDisplay.update();
    player.movePlayer();
    player.update();
}