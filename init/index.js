const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// connecting to mongoDb
const MONGO_URL = "mongodb://127.0.0.1:27017/wandr";

main()
    .then(()=>{
        console.log("connected to DB successfully...");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"6912a6bc0d348dc7ca23fb4c"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();