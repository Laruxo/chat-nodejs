const messages = document.querySelector('.messages');

const input = document.querySelector('.message__input');
const button = document.querySelector('.message__button');
button.addEventListener('click', function() {
  ws.send(input.value);
  input.value = '';
});

const host = window.document.location.host.replace(/:.*/, '');
const ws = new WebSocket('ws://' + host + ':3002/getMessages');

ws.addEventListener('message', function(event) {
  const msg = JSON.parse(event.data);
  for (let i = 0; i < msg.length; i++) {
    addMessage(msg[i]);
  }
});

/**
 * Adds message to messages list
 * @param {string} content
 */
function addMessage(content) {
  const message = document.createElement('li');
  message.innerHTML = content;
  messages.appendChild(message);
}
