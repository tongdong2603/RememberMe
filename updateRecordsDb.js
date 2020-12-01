const AWS = require("aws-sdk");
AWS.config.region = "us-east-1";

const db = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true
})

const tableName = "garoon-office-prod-setting";
const params = {
  TableName: tableName
};

const getRecords = () => {
   db.scan(params, (error, data) => {
     if (error) {
       console.log('error when scand records', tableName, error);
     } else {
       data.Items.forEach(el => {
         console.log(el.version, el.domain)
         console.log("confirm: ", el.version === { 'Ver.2.0.0': 'Ver.2.0.0' } && el.domain === 'https://test-dev-16.cybozu.com')
         if (el.version === { 'Ver.2.0.0': 'Ver.2.0.0' } && el.domain === 'https://test-dev-16.cybozu.com') {
           const updateRecords =  {
             ...el,
             "fieldSyncExcludeArr": [
                "facilities"
             ]
           };
           console.log('1')
           putRecord(tableName, updateRecords);
         }
       })
     }
   })
};

const putRecord = (tabbleName, updatedRecord) => {
  const params = {
    TableName: tabbleName,
    Item: updatedRecord
  }
  db.put(params, (err, data) => {
    if (err) {
      console.log('err');
    }
    console.log('success')
  })
};
getRecords();


