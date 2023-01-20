import express, { request, response } from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config()

const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log('mongo is connected');

app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
    response.send(`Hi, The Server is Running ${PORT}`);
});



app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
