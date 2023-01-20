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

//Money Manager - Expenses

app.post("/expenses", async (request, response) => {
    const data = request.body;
    const result = await client.db('moneyManager')
        .collection('expenses')
        .insertMany(data);

    response.send(result);
});

app.get("/expenses", async (request, response) => {
    const expenses = await client.db('moneyManager')
        .collection('expenses')
        .find({})
        .toArray();

    response.send(expenses);
});

//Money Manager - Income

app.post("/income", async (request, response) => {
    const data = request.body;
    const result = await client.db('moneyManager')
        .collection('income')
        .insertMany(data);

    response.send(result);
});

app.get("/income", async (request, response) => {
    const expenses = await client.db('moneyManager')
        .collection('income')
        .find({})
        .toArray();

    response.send(expenses);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
