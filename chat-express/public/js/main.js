let messages = document.querySelector('.messages');

function addMessage(content) {
  let message = document.createElement('li');
  message.innerHTML = content;
  messages.appendChild(message);
}

const host = window.document.location.host.replace(/:.*/, '');
let ws = new WebSocket('ws://' + host + ':3001/getMessages');

let input = document.querySelector('.message__input');
let button = document.querySelector('.message__button');
button.addEventListener('click', function () {
  ws.send(input.value);
  input.value = '';
});

ws.addEventListener('message', function (event) {
  let msg = JSON.parse(event.data);
  for (let i = 0; i < msg.length; i++) {
    addMessage(msg[i]);
  }
});
