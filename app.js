const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter")
const itemRouter = require("./routes/itemRouter");

app.set("view engine", "ejs");

app.use(express.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/items", itemRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})