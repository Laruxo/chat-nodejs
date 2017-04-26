const messages = document.querySelector('.messages');

const input = document.querySelector('.message__input');
const button = document.querySelector('.message__button');
button.addEventListener('click', function() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = handleSentResponse;
  xhttp.open('POST', '/api/messages/send');
  xhttp.send(input.value);
});

/**
 * Handles simple response.
 * @this XMLHttpRequest
 */
function handleSentResponse() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      console.log(this.responseText);
      input.value = '';
    }
  }
}

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = handleMessagesResponse;
xhttp.open('GET', '/api/messages/all');
xhttp.send();

/**
 * Handles response containing messages array.
 * @this XMLHttpRequest
 */
function handleMessagesResponse() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      const msg = JSON.parse(this.responseText);
      for (let i = 0; i < msg.length; i++) {
        addMessage(msg[i]);
      }
      pool();
    }
  }
}

/**
 * Sends an ajax pool request.
 */
function pool() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = handleMessagesResponse;
  xhttp.open('GET', '/api/messages/pool');
  xhttp.send();
}

/**
 * Adds message to messages list.
 * @param {string} content
 */
function addMessage(content) {
  const message = document.createElement('li');
  message.innerHTML = content;
  messages.appendChild(message);
}
