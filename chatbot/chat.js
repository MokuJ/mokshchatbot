const apiKey = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const userText = input.value.trim();
  if (!userText) return;

  // Append user message
  chat.innerHTML += `<div class="msg"><strong>You:</strong> ${userText}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "[No response]";
    chat.innerHTML += `<div class="msg"><strong>Bot:</strong> ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="msg"><strong>Bot:</strong> Error: ${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }
}
