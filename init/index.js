const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

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
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();