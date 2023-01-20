import express, { request, response } from 'express';
const app = express();
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
    response.send(`Hi, The Server is Running ${PORT}`);
});



app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
