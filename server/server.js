const { application } = require("express");
const express = require("express");
const server = express();
const path = require("path")
require("./database/db")
const cors = require('cors');
const userRoute = require("./Route/userRouter")
const bodyParser = require('body-parser');
const productRoute = require("./Route/productRoute")

PORT = 4500
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use("/",userRoute)
server.use("/",productRoute)
server.use("/uploads", express.static(path.join(__dirname, "uploads")))



server.listen(PORT, ()=>{
    console.log(`listening to the port ${PORT}`)
})