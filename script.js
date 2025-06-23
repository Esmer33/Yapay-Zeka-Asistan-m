const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", handleSend);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${role}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("Sen", userText);
  input.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (reply) {
      appendMessage("Asistan", reply);
    } else {
      appendMessage("Asistan", "Üzgünüm, bir yanıt oluşturamadım.");
    }
  } catch (err) {
    appendMessage("Asistan", `⚠️ Hata: ${err.message}`);
  }
}
