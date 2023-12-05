var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');

var user = { message: '' };

function sendMessage(userMessage) {
  var messageElement = document.createElement('div');
  messageElement.style.textAlign = 'right';
  messageElement.style.margin = '10px';

  messageElement.innerHTML =
    '<span> You: </span>' + '<span>' + userMessage + '</span>';

  chatContainer.appendChild(messageElement);
}

function chatbotResponse(userMessage) {
  console.log(userMessage);
  var messageElement = document.createElement('div');
  messageElement.innerHTML =
    '<span>Chatbot: </span>' + '<span>' + userMessage + '</span>';

  chatContainer.appendChild(messageElement);
}

function getData(inpText) {
  const url = 'http://localhost:3001/v2/api';
  const postData = {
    inpText: inpText,
  };
  // Configuring the fetch request with method: 'POST', headers, and body
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type if sending JSON data
      // Add any other headers if required
    },
    body: JSON.stringify(postData), // Convert the data to a JSON string
  })
    .then((response) => {
      // Handle the response from the server
      if (response.ok) {
        return response.json(); // Parse the JSON response and return the promise
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then((data) => {
      // Handle the data received from the server
      chatbotResponse(data.message);
      console.log('Response from server:', data);
    })
    .catch((error) => {
      // Handle errors that may occur during the fetch request
      console.error('There was a problem with the fetch operation:', error);
    });
}
sendBtn.addEventListener('click', function (e) {
  var userMessage = textbox.value;

  if (userMessage == '') {
    alert('Please type in a message');
  } else {
    let userMessageText = userMessage.trim();
    user.message = userMessageText;
    textbox.value = '';
    sendMessage(userMessageText);
    getData(userMessageText);
  }
});
