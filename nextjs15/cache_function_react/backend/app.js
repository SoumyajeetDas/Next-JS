import express from 'express';

const app = express();

const data = [
  { id: 1, text: 'Hello Worldss' },
  { id: 2, text: 'Another message from the separate backend' },
];

app.get('/messages/:id', (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(
    `${new Date().toISOString()}: EXECUTING /messages on backend from /messages/${req.params.id} from ${requestSource}`,
  );

  // console.log('Response from backend:', res);

  const message = data?.find((msg) => msg?.id === parseInt(req?.params?.id));

  if (!message) {
    return res.status(404).send('Message not found');
  }

  res?.json(message);
});

app.get('*', (_, res) => res.status(404).send('Not Found'));

app.listen(8080, () => console.log('Listening to port no. 8080'));
