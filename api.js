/* eslint no-plusplus: 0 */
require('dotenv').load();
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');

// const csvData = fs.readFileSync();

const api = express();
const json = async () => csv().fromFile(path.resolve(__dirname, './data.csv'));

api.use(cors());
api.use(express.static(path.resolve(__dirname, 'dist')));

let data;

async function start() {
  data = await json();
  api.listen(process.env.API_PORT, () => console.log('Api running'));
}

api.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

api.get('/api', (req, res) => {
  res.send({
    records: data,
  });
});

start();
