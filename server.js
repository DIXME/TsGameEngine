const express = require('express');
const app = express();

const public = __dirname + '/public';
const port = 3000;

app.use(express.static(public));

app.get('/', (req, res) => {
    res.sendFile(public + '/page.html');
})

app.listen(port, () => console.log("Server is running on http://localhost:" + port));