let stompClient = null;

function connect() {
  const socket = new SockJS('http://localhost:8080/chat');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function () {
    console.log("Connected");
    stompClient.subscribe('/topic/messages', function (messageOutput) {
      showMessage(JSON.parse(messageOutput.body));
    });
  });
}

function sendMessage() {
  const username = document.getElementById("username").value;
  const messageContent = document.getElementById("message").value;
  if(username && messageContent) {
    stompClient.send("/app/sendMessage", {}, JSON.stringify({ 'username': username, 'content': messageContent }));
    document.getElementById("message").value = '';
  }
}

function showMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const p = document.createElement("p");
  p.textContent = `${message.timestamp} - ${message.username}: ${message.content}`;
  chatBox.appendChild(p);
}

window.onload = connect;