// network.js
import { getDatabase, ref, set, onValue, update, push, get } from "https://www.gstatic.com/firebasejs/9.30.0/firebase-database-compat.js";

// ---- Initialize Firebase ----
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

export let partyCode = null;
export let partyMembers = [];
export let onPartyUpdateCallback = null;

function generateCode() {
    return Math.random().toString(36).substring(2,7).toUpperCase();
}

export function connectToServer() {
    // For Firebase, no socket connection needed
    console.log("Firebase initialized");
}

export function createParty(playerName="Player1") {
    partyCode = generateCode();
    partyMembers = [playerName];

    const partyRef = ref(db, 'parties/' + partyCode);
    set(partyRef, {
        members: partyMembers,
        status: "waiting" // can use "waiting" or "ready"
    });

    listenToPartyUpdates(partyCode);
    return partyCode;
}

export function joinParty(code, playerName="PlayerX") {
    const partyRef = ref(db, 'parties/' + code);

    get(partyRef).then(snapshot => {
        if (snapshot.exists()) {
            partyCode = code;
            partyMembers = snapshot.val().members || [];
            partyMembers.push(playerName);

            update(partyRef, { members: partyMembers });
            listenToPartyUpdates(partyCode);
        } else {
            alert("Party code not found!");
        }
    });
}

function listenToPartyUpdates(code) {
    const partyRef = ref(db, 'parties/' + code);
    onValue(partyRef, snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            partyMembers = data.members || [];

            if (onPartyUpdateCallback) {
                onPartyUpdateCallback({ code, members: partyMembers });
            }
        }
    });
}

export function queueForMatch(gamemode) {
    // For simplicity, just start the game immediately in Firebase setup
    if (window.startGame) {
        window.startGame({ players: partyMembers, gamemode });
    }
}
