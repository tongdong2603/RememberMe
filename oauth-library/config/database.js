var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./aws.json');
AWS.config.accessKeyId = "root";
AWS.config.secretAccessKey = "root";
AWS.config.region = "us-west-2";
AWS.config.endpoint = "http://localhost:8000";
AWS.config.apiVersions = {
  //dynamodb: '2011-12-05',
  //ec2: '2013-02-01',
  dynamodb: 'latest'
}
exports.dynamodb = new AWS.DynamoDB();
exports.documentClient = new AWS.DynamoDB.DocumentClient();
