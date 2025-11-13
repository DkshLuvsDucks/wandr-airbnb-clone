const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");


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
    await Review.deleteMany({});
    await User.deleteMany({});

    // Create a themed default Wandr admin user
    const adminUser = new User({
        email: "admin@wandr.com",
        username: "the_wandr"
    });

    const registeredAdmin = await User.register(adminUser, "12345678");
    console.log(`Default admin created: @${registeredAdmin.username}`);
  
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: registeredAdmin._id
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");

    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
};

initDB();