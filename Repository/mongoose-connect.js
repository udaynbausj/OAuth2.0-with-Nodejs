const mongoose = require("mongoose");


const keys = require("../config/keys");

mongoose.connect(keys.mongodbUrl.url, () => {
    console.log("Successfully connected to mongoDb");
});
