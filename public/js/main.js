let messages = document.querySelector('.messages');

let input = document.querySelector('.message__input');
let button = document.querySelector('.message__button');
button.addEventListener('click', function() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = handleSentResponse;
  xhttp.open('POST', '/api/messages/send');
  xhttp.send(input.value);
});

function handleSentResponse() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      console.log(this.responseText);
      input.value = '';
    }
  }
}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = handleMessagesResponse;
xhttp.open('GET', '/api/messages/all');
xhttp.send();

function handleMessagesResponse() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      let msg = JSON.parse(this.responseText);
      for (let i = 0; i < msg.length; i++) {
        addMessage(msg[i]);
      }
      pool();
    }
  }
}

function pool() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = handleMessagesResponse;
  xhttp.open('GET', '/api/messages/pool');
  xhttp.send();
}

function addMessage(content) {
  let message = document.createElement('li');
  message.innerHTML = content;
  messages.appendChild(message);
}
