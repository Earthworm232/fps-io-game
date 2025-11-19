let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

export function startMultiplayer(match) {
    document.getElementById("lobby").style.display = "none";
    canvas.style.display = "block";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    loop();
}

function loop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // simple placeholder player
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width/2 - 20, canvas.height/2 - 20, 40, 40);

    requestAnimationFrame(loop);
}

window.startGame = startMultiplayer;
