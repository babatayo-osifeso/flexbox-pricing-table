let chats = JSON.parse(localStorage.getItem("chats")) || [
  { name: "John Doe", messages: [], status: "Open", unread: 2 },
  { name: "Sarah Lee", messages: [], status: "Open", unread: 1 }
];

let currentChat = null;

const chatList = document.getElementById("chatList");
const messagesDiv = document.getElementById("messages");

function saveData(){
  localStorage.setItem("chats", JSON.stringify(chats));
}

function renderChats(){
  chatList.innerHTML = "";
  chats.forEach((chat, index)=>{
    const li = document.createElement("li");
    li.innerHTML = chat.name + 
      (chat.unread > 0 ? `<span class="badge">${chat.unread}</span>` : "");
    li.onclick = ()=> selectChat(index);
    chatList.appendChild(li);
  });
}

function selectChat(index){
  currentChat = chats[index];
  currentChat.unread = 0;
  document.getElementById("userName").textContent = currentChat.name;
  document.getElementById("status").textContent = "Status: " + currentChat.status;
  renderMessages();
  renderChats();
}

function renderMessages(){
  messagesDiv.innerHTML = "";
  currentChat.messages.forEach(msg=>{
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = msg.text + 
      `<div class="timestamp">${msg.time}</div>`;
    messagesDiv.appendChild(div);
  });
  document.getElementById("messageCount").textContent =
    "Messages: " + currentChat.messages.length;
}

function sendMessage(){
  const input = document.getElementById("messageInput");
  if(!input.value || !currentChat) return;

  const newMessage = {
    text: input.value,
    time: new Date().toLocaleTimeString()
  };

  currentChat.messages.push(newMessage);
  input.value = "";
  saveData();
  renderMessages();
}

function toggleStatus(){
  if(!currentChat) return;
  currentChat.status = currentChat.status === "Open" ? "Resolved" : "Open";
  document.getElementById("status").textContent = "Status: " + currentChat.status;
  saveData();
}

function filterChats(){
  const search = document.getElementById("search").value.toLowerCase();
  const filtered = chats.filter(chat =>
    chat.name.toLowerCase().includes(search)
  );
  chatList.innerHTML = "";
  filtered.forEach((chat, index)=>{
    const li = document.createElement("li");
    li.textContent = chat.name;
    li.onclick = ()=> selectChat(index);
    chatList.appendChild(li);
  });
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

renderChats();