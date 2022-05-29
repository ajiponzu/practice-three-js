const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(8080, () => {
  console.log('Server Started');
});
