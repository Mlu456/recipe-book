const express = require('express');
const app = express();
const path = require('path');

// const leaderList = [
//   {name: 'Anna', id: 'a0'},
//   {name: 'Ben', id: 'b0'},
//   {name: 'Clara', id: 'c0'},
//   {name: 'David', id: 'd0'},
// ];

// app.get('/api/leaders', (req, res) => {
//   res.send(leaderList);
// });

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

