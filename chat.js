async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const userText = input.value.trim();
  if (!userText) return;

  chat.innerHTML += `<div class="msg"><strong>You:</strong> ${userText}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();

    if (!response.ok) {
      chat.innerHTML += `<div class="msg"><strong>Bot:</strong> Error: ${data.error.message}</div>`;
    } else {
      const reply = data.reply || "[No response]";
      chat.innerHTML += `<div class="msg"><strong>Bot:</strong> ${reply}</div>`;
    }

    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg"><strong>Bot:</strong> Error: ${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }
}