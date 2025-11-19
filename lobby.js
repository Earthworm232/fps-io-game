import { connectToServer, createParty, joinParty, queueForMatch } from "./network.js";

window.addEventListener("DOMContentLoaded", () => {
    connectToServer();

    document.getElementById("createParty").onclick = () => {
        createParty();
    };

    document.getElementById("joinParty").onclick = () => {
        let code = document.getElementById("partyCodeInput").value;
        joinParty(code);
    };

    document.getElementById("queueButton").onclick = () => {
        let gm = document.getElementById("gamemode").value;

        if (gm === "zombies") {
            window.startZombiesMode();
        } else {
            queueForMatch(gm);
        }
    };
});
