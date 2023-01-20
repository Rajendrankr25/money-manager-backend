const express = require("express");
const app = express();

const PORT = 4000;
app.get("/", function (request, response) {
    response.send(`Hi, The Server is Running ${PORT}`);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
