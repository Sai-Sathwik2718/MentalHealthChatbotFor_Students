import  express from 'express';
const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('uploads'));

app.listen(port, () => {
  console.log(`App listening  on port ${port}`);
})