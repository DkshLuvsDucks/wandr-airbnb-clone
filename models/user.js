const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
    // Username & Pass + Salting + Hashing is done by passport-local-mongoose completely
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);