function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const userText = input.value.trim();

  if (!userText) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "msg";
  userMsg.textContent = "You: " + userText;
  chat.appendChild(userMsg);

  // Fake bot reply
  const botMsg = document.createElement("div");
  botMsg.className = "msg";
  botMsg.textContent = "MokshBot: " + getBotReply(userText);
  chat.appendChild(botMsg);

  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}

function getBotReply(text) {
  // Simple dummy logic
  if (text.toLowerCase().includes("hi")) return "Hello there!";
  if (text.toLowerCase().includes("who are you")) return "I'm your existential crisis with a UI.";
  return "You said: " + text;
}