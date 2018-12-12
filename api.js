/* eslint no-plusplus: 0 */
require('dotenv').load();
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const express = require('express');
const cors = require('cors');

// const csvData = fs.readFileSync();

const api = express();
const json = async () => csv().fromFile(path.resolve(__dirname, './public/data.csv'));

api.use(cors());
let data;

async function start() {
  data = await json();
  api.listen(process.env.API_PORT, () => console.log('Api running'));
}

api.get('/api', (req, res) => {
  res.send({
    records: data,
  });
});

start();
