import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const welcome = "<p>Welcome to StackOverflow-lite's API.'>Api-v1</a></p>";
  res.status(200).send(welcome);
});

app.use('/api/v1', routes);

app.get('/*', (req, res) => {
  res.status(400).json('Request not recognized');
});

app.listen(port);
console.log('server is running at', port);
export default app;