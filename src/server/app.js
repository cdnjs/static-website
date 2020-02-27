const path = require('path');
const express = require('express');
const app = express();
const port = 8000;

const dev = path.join(__dirname, '..', '..', 'dev');

app.use(express.static(dev));
app.get('*', (req, res) => res.sendFile(path.join(dev, 'index.html')));

app.listen(port, () => console.log(`Dev server running @ http://localhost:${port}/!`));
