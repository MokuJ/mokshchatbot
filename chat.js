const apiKey = "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";

document.getElementById("send-btn").addEventListener("click", async () => {
    const input = document.getElementById("user-input").value;
    if (!input.trim()) return;

    addMessage("You", input);
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: input }]
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No reply from AI.";
        addMessage("Bot", reply);
    } catch (err) {
        addMessage("Bot", "Error: " + err.message);
    }
});

function addMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const message = document.createElement("div");
    message.className = "message";
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}