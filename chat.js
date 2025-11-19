// chat.js
import { sendChat } from "./network.js";

const chatContainer = document.getElementById("chatContainer");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendChat");

chatContainer.style.display = "block";

sendBtn.onclick = () => {
  if (!chatInput.value) return;
  sendChat(chatInput.value);
  chatInput.value = "";
};

export function addChatMessage(name, text) {
  let msg = document.createElement("div");
  msg.innerText = `${name}: ${text}`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
