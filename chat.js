async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const userText = input.value.trim();
  if (!userText) return;

  chat.innerHTML += `<div class="msg"><strong>You:</strong> ${userText}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      chat.innerHTML += `<div class="msg"><strong>Bot:</strong> Error: ${data.error.message}</div>`;
    } else {
      const reply = data.choices?.[0]?.message?.content || "[No response]";
      chat.innerHTML += `<div class="msg"><strong>Bot:</strong> ${reply}</div>`;
    }

    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg"><strong>Bot:</strong> Error: ${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }
}