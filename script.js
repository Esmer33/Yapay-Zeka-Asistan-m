const input = document.getElementById("input");
const messages = document.getElementById("messages");

async function gonder(metin) {
  messages.innerHTML += `<p><strong>Sen:</strong> ${metin}</p>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: metin })
    });

    const data = await res.json();
    messages.innerHTML += `<p><strong>Asistan:</strong> ${data.reply}</p>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (err) {
    messages.innerHTML += `<p><strong>Asistan:</strong> Hata oluştu.</p>`;
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") gonder(input.value);
});