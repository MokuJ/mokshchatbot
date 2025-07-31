export default async function handler(req, res) {
  const userMessage = req.body?.message;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided." });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "Error";

  res.status(200).json({ reply });
}
