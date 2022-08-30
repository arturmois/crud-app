//db.js
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

MongoClient.connect(
    process.env.MONGODB_CONNECTION,
    { useUnifiedTopology: true })
    .then(connection => {
        global.connection = connection.db("crudApp");
        console.log("Connected to MongoDB!");
    })
    .catch(error => console.log(error));

function findCustomers() {
    return global.connection
        .collection("customers")
        .find({}).toArray();
}

function findCustomer(id) {
    const objectId = new ObjectId(id);
    return global.connection
        .collection("customers")
        .findOne({ _id: objectId });
}

function insertCustomer(customer) {
    return global.connection
        .collection("customers")
        .insertOne(customer);
}

function updateCustomer(id, customer) {
    const objectId = new ObjectId(id);
    return global.connection
        .collection("customers")
        .updateOne({ _id: objectId }, { $set: customer });
}

function deleteCustomer(id) {
    const objectId = new ObjectId(id);
    return global.connection
        .collection("customers")
        .deleteOne({ _id: objectId });
}

module.exports = {
    findCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer
}