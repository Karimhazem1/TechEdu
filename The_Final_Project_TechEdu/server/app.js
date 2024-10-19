require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router")
const routerU = require("./routes/routerU")
const routerC = require("./routes/routerC")
const DB = require("./db/connection")
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 6010

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/images",express.static("./uploads/images"));
app.use("/uploads/videos",express.static("./uploads/videos"));
app.use("/files",express.static("./public/files"));
app.use(router)
app.use(routerU)


app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`);
})