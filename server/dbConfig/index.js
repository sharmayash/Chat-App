const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose
  .connect(keys.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err.message + "\n" + err.reason))
