const AWS = require("aws-sdk");
AWS.config.region = "ap-southeast-1";

const db = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
});

const self = this;

const tableName = "garoon-google-dev-task";
const domain = "https://test-dev-8.cybozu.com";

// get task

const getTask = (tableName, domain, ExclusiveStartKey) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tableName,
      IndexName: "domain-garoonId-index",
      KeyConditionExpression: "#dm = :dm",
      ExpressionAttributeNames: {
        "#dm": "domain"
      },
      ExpressionAttributeValues: {
        ":dm": domain
      }
    };
    if (ExclusiveStartKey) {
      params.ExclusiveStartKey = ExclusiveStartKey;
    }
    db.query(params, (err, data) => {
      if (err) {
        reject({ err, additionalInfo: { dynamoQueryParams: params } });
      } else if (data.LastEvaluatedKey) {
        self
          .getTask(tableName, domain, data.LastEvaluatedKey)
          .then(items => {
            resolve([...items, ...data.Items]);
          })
          .catch(error => {
            reject({
              err: error,
              line: generateCurrentLine(),
              additionalInfo: { dynamoQueryParams: params }
            });
          });
      } else {
        resolve(data.Items);
      }
    });
  });
};

const deleteTask = (tableName, domain, taskId) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tableName,
      Key: {
        domain,
        taskId
      }
    };

    db.delete(params, err => {
      if (err) {
        reject(err);
      } else {
        console.log('complete');
      }
    });
  });
};
getTask(tableName, domain)
  .then(data => {
    data.forEach(el => {
      deleteTask(tableName, domain, el.taskId)
    })
  })
  .catch(err => console.log(err));
