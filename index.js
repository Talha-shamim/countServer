const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb+srv://abc:user@123@cluster0.hpdua.mongodb.net/web?retryWrites=true&w=majorityt",  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("error");
})

const countSchema = {
    views : Number,
}
const Count = mongoose.model("Count",countSchema);

// const newData = {
//   views: 5,
// };

// const add = async () => {
//   await new Count(newData).save();
// };

// add();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/count", async (req,res) => {
    console.log("got request")
    const count_ = await Count.findOne({});
    count_.views += 1;
    await count_.save();
});

app.get("/countViews", async (req,res) => {
    console.log("count sending")
    const count_ = await Count.findOne({});
    console.log(count_.views);
    res.json(count_.views);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`lisening on ${PORT}`);
});