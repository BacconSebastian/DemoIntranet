const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require('cors');

require("./db.js");

const server = express();

server.name = "API";

http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80);

const corsOptions = {
  origin: "https://13.42.129.29",
  credentials: true,
};

server.set('trust proxy', 1);
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const options = {
  key: fs.readFileSync('/path/to/private/key.pem'),
  cert: fs.readFileSync('/path/to/certificate.pem')
};

https.createServer(options, server).listen(443);
