const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-southeast-1"
    // region: "us-east-1"
});

const db = new AWS.DynamoDB.DocumentClient({
    convertEmptyValues: true
});

const getItem = () => {
  db.get({
    TableName: "pluginAuthTable",
    Key: {
      domain: 'test-dev-6.cybozu.com'
    }
  }, (err, data) => {
    if (err) {
      console.log("err : ", err);
      return;
    }
    console.log(data);
  })
};

getItem();