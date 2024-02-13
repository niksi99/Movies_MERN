require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const ConnectMongoDB = require('./server/config/MongoDB');
const MovieRoute = require('./server/routes/MovieRoute');
const app = express();

ConnectMongoDB();
app.get("/", (req, res) => {
    res.send("Daf");
});

app.use(morgan("dev"))
app.use(body_parser.json());

const port = process.env.PORT || 4000
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['*'],
}))

app.use(MovieRoute);//http:localhost:1001/Create
//app.use("/Movies", MovieRoute);//http:localhost:1001/movies/create

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})