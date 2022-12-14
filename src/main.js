let express = require("express");
require("dotenv").config();

let app = express();

app.use(express.json());

let messageRoutes = require("./routes/messageRoutes");
let authRoutes = require("./routes/authRoutes")

// app.use(messageRoutes);

app.use(authRoutes);
app.use(messageRoutes);

let port = process.env.PORT || 8080

app.listen(port,function(){
    console.log("Application started on port ", port);




})



