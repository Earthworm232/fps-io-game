// network.js
import { startGame } from "./game.js";
import { addChatMessage } from "./chat.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdJMHPo8Rfdjv12AvJeNFiuIMZ00JC4L4",
    authDomain: "fpsmultiplayer-f71c1.firebaseapp.com",
    projectId: "fpsmultiplayer-f71c1",
    storageBucket: "fpsmultiplayer-f71c1.firebasestorage.app",
    messagingSenderId: "208679147830",
    appId: "1:208679147830:web:d6d233f491a0d189253b97",
    measurementId: "G-JEY98Z23T5"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export let socket = null; // placeholder for party code
export let partyCode = null;
export let playerName = "Player";
export let players = {}; // other players

// Party system
export function createParty(name) {
  playerName = name || "Player";
  partyCode = Math.random().toString(36).substring(2, 7).toUpperCase();
  db.ref("parties/" + partyCode).set({
    name: playerName,
    players: { [playerName]: { x: 0, y: 0, z: 0, rotY: 0 } },
    chat: {}
  });
  listenParty();
  return partyCode;
}

export function joinParty(code, name) {
  playerName = name || "Player";
  partyCode = code;
  db.ref("parties/" + partyCode + "/players/" + playerName).set({
    x: 0,
    y: 0,
    z: 0,
    rotY: 0
  });
  listenParty();
}

// Listen for updates
function listenParty() {
  db.ref("parties/" + partyCode).on("value", (snapshot) => {
    let data = snapshot.val();
    if (!data) return;
    players = data.players || {};
    if (data.chat) {
      Object.values(data.chat).forEach(msg => addChatMessage(msg.name, msg.text));
    }
    startGame(players, playerName);
  });
}

// Update player position
export function updatePlayerPosition(pos) {
  if (!partyCode) return;
  db.ref(`parties/${partyCode}/players/${playerName}`).update(pos);
}

// Send chat message
export function sendChat(text) {
  if (!partyCode) return;
  let chatRef = db.ref(`parties/${partyCode}/chat`).push();
  chatRef.set({ name: playerName, text });
}
