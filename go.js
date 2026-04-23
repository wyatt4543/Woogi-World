var player;

function startGame() {
    player = new component(30, 30, "red", 210, 105);
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
    this.playerSpeed = 1;
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
    this.newPos = function () {
        if (this.x !== this.goalX) {
            this.x += Math.sign(this.goalX - this.x) * this.playerSpeed;
        }
        if (this.y !== this.goalY) {
            this.y += Math.sign(this.goalY - this.y) * this.playerSpeed;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    player.newPos();
    player.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}