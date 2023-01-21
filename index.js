import express, { request, response } from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
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
    response.send(`Hi, The Server is Running`);
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

app.get("/expenses/:id", async (request, response) => {
    const { id } = request.params;
    const expense = await client.db('moneyManager')
        .collection('expenses')
        .findOne({ _id: ObjectId(id) });

    expense ? response.send(expense) : response.status(404).send({ message: "Expenses not found" });
});

app.put('/expenses/:id', async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const result = await client.db('moneyManager')
        .collection('expenses')
        .updateOne({ _id: ObjectId(id) }, { $set: data });

    response.send(result);
});

app.delete("/expenses/:id", async (request, response) => {
    const { id } = request.params;
    const result = await client.db('moneyManager')
        .collection('expenses')
        .deleteOne({ _id: ObjectId(id) });

    console.log(result);
    result.deletedCount > 0 ? response.send({ message: "expense deleted" }) :
        response.send({ message: "expense not found" });
})

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

app.get("/income/:id", async (request, response) => {
    const { id } = request.params;
    const income = await client.db('moneyManager')
        .collection('income')
        .findOne({ _id: ObjectId(id) });

    income ? response.send(income) : response.status(404).send({ message: "Income not found" });
});

app.put('/income/:id', async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const result = await client.db('moneyManager')
        .collection('income')
        .updateOne({ _id: ObjectId(id) }, { $set: data });

    response.send(result);
});

app.delete("/income/:id", async (request, response) => {
    const { id } = request.params;
    const result = await client.db('moneyManager')
        .collection('income')
        .deleteOne({ _id: ObjectId(id) });

    console.log(result);
    result.deletedCount > 0 ? response.send({ message: "income deleted" }) :
        response.send({ message: "income not found" });
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
