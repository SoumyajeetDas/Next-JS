import express from 'express';

const app = express();

app.get('/messages', (req, res) => {
  const requestSource = req.headers['x-id'];
  // console.log(
  //   `${new Date().toISOString()}: EXECUTING /messages on backend from /messages)}`,
  // );
  res.json([
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Another message from the separate backend' },
  ]);
});

app.get('/another', (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(
    `${new Date().toISOString()}: EXECUTING /another on backend from /another`,
  );
  res.json([
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Another message from the separate backend' },
  ]);
});
app.get('/time', (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(
    `${
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds()
    }: EXECUTING /time on backend from /time`,
  );
  res.json({
    time:
      new Date().getHours() +
      ':' +
      new Date().getMinutes() +
      ':' +
      new Date().getSeconds(),
  });
});

app.listen(8080, () => console.log('Listening to port no. 8080'));
