const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
let garoonConsole = require('./app/console/GaroonConsole')
exports.handler = async (event) => {
    garoonConsole.console()
}