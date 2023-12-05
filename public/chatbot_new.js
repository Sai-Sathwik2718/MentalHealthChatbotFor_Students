const express = require('express');
const bodyParser = require('body-parser');
const { NlpManager } = require('node-nlp');

const app = express();
const port = 3002;

// Configure body parser middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const manager = new NlpManager({ languages: ['en'] });
manager.addDocument('en', 'Hello','Wassup');
manager.addDocument('en', 'Hi', 'Hello');
manager.addDocument('en', 'How are you?', 'I am fine');


manager.train();

app.post('/processInput', (req, res) => {
  const userInput = req.body.userInput;

  // Process user input using node-nlp
  manager.process('en', userInput)
    .then(response => {
      // Log the processed output for debugging
      console.log('Processed Output:', {response});

      // Send the processed output back to the user
      res.json({ output: response.intent });
    })
    .catch(error => {
      console.error('Processing Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



// Set up a simple HTML form to take user input
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
