const _ = require('lodash');
const chalk = require('chalk');
const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

const readFileAsync = Promise.promisify(require('fs').readFile);

const config = require('./config');

const client = (mozaik) => {
  mozaik.loadApiConfig(config);

  return {
    list(params) {
      const {path:pathToFile, url} = params;

      mozaik.logger.info(`Fetching table data from ${pathToFile || url}`);

      return pathToFile
        ? getFSData(params)
        : getAPIData(params)
      ;
    }
  };
};

module.exports = client;

function getFSData(params) {
  const {path:pathToFile} = params;
  return path.extname(pathToFile) === '.json' ?
    getJSONFromJSONFile(pathToFile) :
    getJSONFromCSVFile(pathToFile);;
}

function getAPIData(params) {
  const {url, headers={}} = params;

  return request
    .get(url)
    .set(headers || {}).promise()
    .then(res => _.get(res, 'body'))
}

function getJSONFromJSONFile(pathToFile) {
  return readFileAsync(pathToFile)
    .then(data => safeJSONParse(data));
}

function getJSONFromCSVFile(pathToFile) {
  return new Promise(function(resolve, reject) {
    csv().fromFile(pathToFile)
    .on('json', data => resolve(data))
    .on('done', err => err && reject(err));
  });
}

function safeJSONParse(data){
  return _.attempt(JSON.parse.bind(null, data));
}

