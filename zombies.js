export function startZombiesMode() {
    document.getElementById("lobby").style.display = "none";
    let canvas = document.getElementById("gameCanvas");
    canvas.style.display = "block";

    let ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let player = { x: innerWidth/2, y: innerHeight/2 };
    let zombies = [];

    function spawnZombie() {
        zombies.push({
            x: Math.random()*innerWidth,
            y: Math.random()*innerHeight
        });
    }

    setInterval(spawnZombie, 1500);

    function loop() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        // player
        ctx.fillStyle = "white";
        ctx.fillRect(player.x-20, player.y-20, 40,40);

        // zombies
        ctx.fillStyle = "green";
        for (let z of zombies) {
            z.x += (player.x - z.x) * 0.01;
            z.y += (player.y - z.y) * 0.01;
            ctx.fillRect(z.x-15, z.y-15, 30, 30);
        }

        requestAnimationFrame(loop);
    }

    loop();
}

window.startZombiesMode = startZombiesMode;
