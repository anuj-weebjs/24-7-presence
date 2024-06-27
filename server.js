const express = require('express');

const app = express();

app.all("/", (req, res) => {
  res.send("its running!");
});

app.listen(8989, () => {
  console.log("Server is ready!");
});
function keepAlive() {
}

module.exports = keepAlive;
